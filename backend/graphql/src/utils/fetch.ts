import fetch, { RequestInit, Response } from 'node-fetch';

const isProduction =
  process.env['GCLOUD_PROJECT'] || process.env.NODE_ENV !== 'development';
const baseUrl = isProduction ? 'https://codyduong.dev/' : null;

type API = 'email-api';

const API_MAP: Record<API, string> = {
  'email-api': 'EMAIL_API_DEV_URL',
};

export default function fetchWithApi(
  api: API,
  init?: RequestInit
): Promise<Response> {
  const apiUrl = isProduction ? baseUrl + api : process.env[API_MAP[api]];

  if (!apiUrl) {
    throw new Error(`Required env variable: ${API_MAP[api]} was not set`);
  }

  return fetch(apiUrl, init);
}
