/* eslint-disable @typescript-eslint/no-var-requires */
const functions = require('firebase-functions');
import server from './server';

exports.email = functions.https.onRequest(server);
