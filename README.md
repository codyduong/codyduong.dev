# codyduong.dev

This is my monorepo for codyduong.dev

## Technical Details

* frontend/web
  * [Vite](https://vite.dev/) SSR w/ [React](https://react.dev/) and [Million.js](https://github.com/aidenybai/million)
  * Server for SSR is managed in `./frontend/web/server.ts` and associated files. I really don't like the
    automagic of Next.js.
    
* backend/gql
  * TODO: middleware/backend w/ apollo-gql. This is something that was formerly on my old website. I haven't
    implemented it yet, but probably used to store blog posts or something.

* [pulumi](https://www.pulumi.com/) is used as a partial IaC solution to deploy to
  * firebase hosting (static deploy) and release
  * google cloud - artifactregistry (docker)
    * google cloud - cloudrun
    * google iam

## Deployment

```sh
cd frontend/web
docker build -t web .
cd ../..
pulumi up --logtostderr -v=9
```

<!--

pulumi error
```
docker-build:index:Image (web):
    error: booting builder: context deadline exceeded
```
solved by
```
docker pull moby/buildkit:buildx-stable-1
```

pulumi generate gcloud creds
```
gcloud auth application-default login --impersonate-service-account <ServiceAccountEmail-firebase@...> 
# move to this workspace at application_default_credentials.json
```

pulumi up
```
# pulumi up --logtostderr -v=3
pulumi up --logtostderr -v=9
```

-->