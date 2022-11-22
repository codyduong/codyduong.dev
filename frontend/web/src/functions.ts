import functions from 'firebase-functions';
import admin from 'firebase-admin';
import server from './server';

admin.initializeApp();

const web = functions.https.onRequest(server);
export default web;
