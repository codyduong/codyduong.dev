/* eslint-disable @typescript-eslint/no-var-requires */
import * as dotenv from 'dotenv';
dotenv.config();
const functions = require('firebase-functions');
import server from './server';

console.log(process.env);

export const app = functions.https.onRequest(server);
exports.app = app;
