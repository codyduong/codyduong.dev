import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";
import * as gcp from "@pulumi/gcp";
import * as random from "@pulumi/random";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import * as command from "@pulumi/command";
import { fileURLToPath } from "node:url";

// Import the program's configuration settings.
const config = new pulumi.Config();
const imageName = config.require("imageName");
const appPath = config.require("appPath");
const containerPort = config.requireNumber("containerPort");
const cpu = config.requireNumber("cpu");
const memory = config.require("memory");
const concurrency = config.requireNumber("concurrency");

// Import the provider's configuration settings.
const gcpConfig = new pulumi.Config("gcp");
const location = gcpConfig.require("region");
const project = gcpConfig.require("project");

// Generate a unique Artifact Registry repository ID
const uniqueString = new random.RandomString("unique-string", {
  length: 4,
  lower: true,
  upper: false,
  numeric: true,
  special: false,
});
let repoId = uniqueString.result.apply((result) => "repo-" + result);

// Create an Artifact Registry repository
const repository =
  (await gcp.artifactregistry
    .getRepository({
      location,
      repositoryId: "docker",
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(`Failed to find repository with error:\n${err}\ncreating...`);
      return undefined;
    })) ??
  new gcp.artifactregistry.Repository("docker", {
    project,
    description: undefined,
    format: "Docker",
    location: location,
    repositoryId: "docker",
  });

// Form the repository URL
let repoUrl = pulumi.concat(location, "-docker.pkg.dev/", project, "/", repository.repositoryId);
const tagName = pulumi.concat(repoUrl, "/", imageName, ":latest");

// Create a container image for the service.
// Before running `pulumi up`, configure Docker for authentication to Artifact Registry
// as described here: https://cloud.google.com/artifact-registry/docs/docker/authentication
const image = new docker.Image(
  "web",
  {
    imageName: tagName,
    build: {
      builderVersion: "BuilderBuildKit",
      context: appPath,
      dockerfile: `${appPath}\\Dockerfile`,
      // https://cloud.google.com/run/docs/container-contract#languages
      platform: "linux/amd64",
    }
  },
  {
    customTimeouts: {
      create: "15m",
    },
  },
);

// Create a Cloud Run service definition.
// # https://cloud.google.com/run/docs/reference/yaml/v1
const service = new gcp.cloudrunv2.Service("web", {
  location,
  name: "web",
  template: {
    annotations: {
      "run.googleapis.com/startup-cpu-boost": 'false',
      "run.googleapis.com/cpu-throttling": 'true',
    },
    sessionAffinity: true,
    containers: [
      {
        image: image.imageName,
        resources: {
          limits: {
            memory,
            cpu: cpu.toString(),
          },
        },
        ports: {
          containerPort,
        },
        envs: [
          {
            name: "NODE_ENV",
            value: "production",
          },
          // this breaks routing, not very clever am i
          // {
          //   name: "BASE",
          //   value: "https://codyduong.dev/",
          // },
        ],
        startupProbe: {
          timeoutSeconds: 60,
          periodSeconds: 60,
          failureThreshold: 1,
          tcpSocket: {
            port: containerPort,
          },
        },
      },
    ],
    maxInstanceRequestConcurrency: concurrency,
    timeout: "60s",
    scaling: {
      minInstanceCount: 0,
      maxInstanceCount: 5,
    },
  },
});

// Create an IAM member to allow the service to be publicly accessible.
const invoker = new gcp.cloudrun.IamMember("invoker", {
  location,
  service: service.name,
  role: "roles/run.invoker",
  member: "allUsers",
});

// Export the URL of the service.
// export const url = service.statuses.apply((statuses) => statuses[0]?.url);
// const site = new gcp.firebase.HostingSite("codyduongweb", {
//   project,
// });

// // Set up hosting configuration
// const hostingConfig = new gcp.firebase.HostingVersion("codyduongweb", {
//   siteId: site.name,
//   config: {
//     rewrites: [
//       {
//         glob: "**",
//         run: {
//           serviceId: "web",
//           region: "us-central1",
//         },
//       },
//     ],
//   },
// });

const directories = [appPath] as const;

function hashDirectories(dirs: readonly string[] | string[]): string {
  const hash = crypto.createHash("sha256");

  for (const dir of dirs) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        const content = fs.readFileSync(filePath);
        hash.update(content);
      } else if (stat.isDirectory()) {
        hash.update(hashDirectories([filePath]));
      }
    }
  }

  return hash.digest("hex");
}

const directoryHash: string = hashDirectories(directories);

const deploy = new command.local.Command(
  `Firebase Deploy: ${directoryHash}`,
  {
    create: pulumi.runtime.isDryRun()
      ? pulumi.interpolate`echo "[Preview] Skipping firebase deploy for hash: ${directoryHash}"`
      : pulumi.interpolate`firebase deploy --project ${project} --only hosting --message "${directoryHash}"`,
    environment: {
      // FIREBASE_AUTH_TOKEN: firebaseToken,
      GOOGLE_APPLICATION_CREDENTIALS: path.resolve(
        fileURLToPath(import.meta.url),
        "/application_default_credentials.json",
      ),
    },
    dir: appPath,
    triggers: [image],
  },
  {
    dependsOn: [image, service, invoker],
  },
);

// Deploy the new hosting configuration
// const hostingRelease = new gcp.firebase.HostingRelease(`version-${directoryHash}`, {
//   siteId: site.name,
//   versionName: hostingConfig.name,
//   type: "DEPLOY",
// });
