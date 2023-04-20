import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { schema } from './schema';
import { context, Context } from './context';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const port = parseInt(process.env.PORT || '8080');

// Setup express cloud function
const app = express();
const httpServer = http.createServer(app);

// Create graphql server
async function startServer(): Promise<void> {
  const apolloServer = new ApolloServer<Context>({
    schema: await schema(),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();
  app
    .use(
      cors(),
      bodyParser.json(),
      expressMiddleware(apolloServer, { context })
    )
    .listen(port, () => {
      console.log(`\
  🚀 Server started on port ${port}
    `);
    });
}
startServer();
