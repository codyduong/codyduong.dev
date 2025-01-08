
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

-->