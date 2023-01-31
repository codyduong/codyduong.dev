/* eslint-disable @typescript-eslint/no-var-requires */
const functions = require('firebase-functions');
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema';
import { context } from './context';

// const typeDefs = require('../schema.graphql');

// Setup express cloud function
const app = express();

//Create graphql server

let apolloServer: any = null;
async function startServer() {
  apolloServer = new ApolloServer({ schema: await schema(), context: context });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/', cors: true });
}
startServer();

exports.api = functions.https.onRequest(app);
