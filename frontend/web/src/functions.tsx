/* eslint-disable @typescript-eslint/no-var-requires */
const functions = require('firebase-functions');
import server from 'server';

export const app = functions.https.onRequest(server);
exports.app = app;
