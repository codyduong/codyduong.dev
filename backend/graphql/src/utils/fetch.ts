import fetch, { RequestInit, Response } from 'node-fetch';
import { GoogleAuth } from 'google-auth-library';

const isProduction =
  process.env['GCLOUD_PROJECT'] || process.env.NODE_ENV !== 'development';
const baseUrl = isProduction ? 'https://codyduong.dev/' : null;

type API = 'email-api';

const API_MAP: Record<API, string> = {
  'email-api': 'EMAIL_API_DEV_URL',
};

const PROD_API_AUTH_MAP: Record<API, string> = {
  'email-api': 'https://us-central1-codyduongweb.cloudfunctions.net/email-api',
};

const auth = new GoogleAuth();

export default async function fetchWithApi(
  api: API,
  init?: RequestInit
): Promise<Response> {
  let { headers } = init ?? {};
  const apiUrl = isProduction ? baseUrl + api : process.env[API_MAP[api]];

  if (isProduction) {
    // Get credentials required for running cloud function invocation from another function
    const client = await auth.getIdTokenClient(PROD_API_AUTH_MAP[api]);
    const gcfHeaders = await client.getRequestHeaders();

    if (headers) {
      const headersKeys = Object.keys(headers);
      const overlap = Object.keys(gcfHeaders).filter((v) =>
        headersKeys.includes(v)
      );
      if (overlap.length > 0) {
        console.warn(`There was overlap in headers: ${overlap}`);
      }
    }
    headers = { ...headers, ...gcfHeaders };
  }

  if (!apiUrl) {
    throw new Error(`Required env variable: ${API_MAP[api]} was not set`);
  }

  return fetch(apiUrl, { ...init, headers });
}
