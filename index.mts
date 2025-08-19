import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";
import * as docker_build from "@pulumi/docker-build";
import * as gcp from "@pulumi/gcp";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import * as command from "@pulumi/command";
import { fileURLToPath } from "url";

// Import the program's configuration settings.
const config = new pulumi.Config();
const imageName = config.require("imageName");
const appPath = config.require("appPath");
const containerPort = config.requireNumber("containerPort");
const cpu = config.requireNumber("cpu");
const memory = config.require("memory");
const concurrency = config.requireNumber("concurrency");
const billingAccount = config.require("billingAccount");
const appId = config.require("appId");
const siteId = config.require("siteId");

// Import the provider's configuration settings.
const gcpConfig = new pulumi.Config("gcp");
const location = gcpConfig.require("region");
const project = gcpConfig.require("project");

const gcpProject = new gcp.organizations.Project("default", {
  projectId: project,
  name: project,
  billingAccount,
  labels: {
    firebase: "enabled",
  },
  autoCreateNetwork: true,
  deletionPolicy: "PREVENT",
}, {protect: true})
const firebaseProject = new gcp.firebase.Project("default", {
  project: gcpProject.projectId
}, {protect: true})

// Create an Artifact Registry repository
const repository =
  new gcp.artifactregistry.Repository("default", {
    project,
    description: undefined,
    cleanupPolicyDryRun: true,
    format: "DOCKER",
    location: location,
    repositoryId: "docker",
    dockerConfig: {
      immutableTags: false,
    }
  }, {protect: true});

const today = new Date()
const todayString = `${today.getUTCFullYear()}-${today.getUTCMonth()}-${today.getUTCDate()}`

// Form the repository URL
let repoUrl = pulumi.concat(location, "-docker.pkg.dev/", project, "/", repository.repositoryId);
const tagBase = pulumi.concat(repoUrl, "/", imageName, ":base");
const tagName = pulumi.concat(repoUrl, "/", imageName, ":latest");

// Create a container image for the service.
// Before running `pulumi up`, configure Docker for authentication to Artifact Registry
// as described here: https://cloud.google.com/artifact-registry/docs/docker/authentication
const image = new docker_build.Image(
  "web",
  {
    push: true,
    tags: [tagName],
    dockerfile: {
      location: pulumi.concat(appPath, '/Dockerfile'),
    },
    context: {
      location: appPath,
    },
    platforms: [
            // https://cloud.google.com/run/docs/container-contract#languages
      "linux/amd64"
    ],
    cacheFrom: [{
        registry: {
          ref: tagBase
        }
      }],
    cacheTo: [{
      registry: {
        ref: tagBase
      }
    }],
    buildOnPreview: true,
    buildArgs: {
      "BUILDKIT_INLINE_CACHE": "1"
    }
  },
  {
    customTimeouts: {
      create: "10m",
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
        image: image.ref,
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

/**
 * https://firebase.google.com/docs/hosting/manage-hosting-resources
 */

const versionBuild = new command.local.Command(
  `Website Build: ${directoryHash}`,
  {
    create: pulumi.runtime.excessiveDebugOutput
      ? pulumi.interpolate`bun run build:client -d`
      : pulumi.interpolate`bun run build:client`,
    dir: appPath,
    triggers: [image],
    
  },
)
// const cpCmd = `cp -r ${appPath}/dist/client ./public`
// const cpBuild = new command.local.Command(
//   cpCmd,
//   {
//     create: pulumi.runtime.isDryRun() ? `echo "[Preview] Skipping ${cpCmd}"` : cpCmd,
//     dir: './',
//     triggers: [versionBuild]
//   }
// )
const site = new gcp.firebase.HostingSite("default", {
  project,
  appId,
  siteId,
}, {protect: true})
// const hostingVersion = new gcp.firebase.HostingVersion("default", {
//   siteId,
//   config: {
//     // public: "./frontend/web/dist/client",
//     // ignore: [
//     //   "firebase.json",
//     //   "**/.*",
//     //   "**/node_modules/**",
//     //   "**/index.html"
//     // ],
//     rewrites: 
//       [
//         {
//           glob: "**",
//           run: {
//             serviceId: service.name,
//             region: service.location,
//           }
//         }
//       ]
//   },
// }, {dependsOn: [site, cpBuild]})
const customDomain1 = new gcp.firebase.HostingCustomDomain("codyduong.com", {
  certPreference: "GROUPED",
  project,
  siteId,
  customDomain: "codyduong.com",
  redirectTarget: "codyduong.dev",
}, {protect: true, dependsOn: site})
const customDomain2 = new gcp.firebase.HostingCustomDomain("www.codyduong.com", {
  certPreference: "GROUPED",
  project,
  siteId,
  customDomain: "www.codyduong.com",
  redirectTarget: "codyduong.dev",
}, {protect: true, dependsOn: site})
const customDomain3 = new gcp.firebase.HostingCustomDomain("codyduong.dev", {
  certPreference: "GROUPED",
  project,
  siteId,
  customDomain: "codyduong.dev",
}, {protect: true, dependsOn: site})
const customDomain4 = new gcp.firebase.HostingCustomDomain("www.codyduong.dev", {
  certPreference: "GROUPED",
  project,
  siteId,
  customDomain: "www.codyduong.dev",
  redirectTarget: "codyduong.dev",
}, {protect: true, dependsOn: site})
// const hostingRelease = new gcp.firebase.HostingRelease("default", {
//   siteId,
//   versionName: hostingVersion.name,
//   message: directoryHash,
// }, {dependsOn: [image, hostingVersion, customDomain1, customDomain2, customDomain3, customDomain4]})
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
    dependsOn: [image, service, invoker, versionBuild],
  },
);
