/* eslint-disable @typescript-eslint/no-var-requires */
const functions = require('firebase-functions');
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { schema } from './schema';
import { context, Context } from './context';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

// Setup express cloud function
const app = express();
const httpServer = http.createServer(app);

// Create graphql server
async function startServer() {
  const apolloServer = new ApolloServer<Context>({
    schema: await schema(),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();
  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(apolloServer, { context })
  );
}
startServer();

exports.api = functions.https.onRequest(app);
