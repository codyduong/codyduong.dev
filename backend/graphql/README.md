# GraphQL Server with Authentication & Permissions

Built with the following stack

- [**Apollo Server**](https://github.com/apollographql/apollo-server): HTTP server for GraphQL APIs   
- [**GraphQL Nexus**](https://nexusjs.org/docs/): GraphQL schema definition and resolver implementation 
- [**GraphQL Shield**](https://github.com/maticzav/graphql-shield): Authorization/permission layer for GraphQL schemas
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)                  
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations               
- [**MongoDB**](https://www.mongodb.com/)

## Contents

- [Getting Started](#getting-started)
- [Build and Deploy](#build-and-deploy)
- [Technical Details](#technical-details)

## Getting Started

### 1. Launch GraphQL Server

Launch your GraphQL server with this command:

```
yarn run dev
```

### 2. Authenticated Requests

```json
{
  "Authorization": "Bearer __YOUR_TOKEN__"
}
```

With a real token, this looks similar to this:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanAydHJyczFmczE1MGEwM3kxaWl6c285IiwiaWF0IjoxNTQzNTA5NjY1fQ.Vx6ad6DuXA0FSQVyaIngOHYVzjKwbwq45flQslnqX04"
}
```

Inside the Playground, you can set HTTP headers in the bottom-left corner:

![](https://imgur.com/ToRcCTj.png)

## Build and Deploy

### 1. Build
```
yarn build
```

### 2. Deploy to Firebase Functions
Deployment is handled outside of this repo. `firebase.json` is at `frontend\web\firebase.json`

## Technical Details

This project contains some custom handlers that I wrote to more easily write resolvers for the schema.

There is a custom handler function called `generateSchemaTypesFromAdapters` in `src/utils` 
which automatically imports files in `src/adapters/**` so we can have a seperate the schema out.
