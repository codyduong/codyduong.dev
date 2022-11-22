/* eslint-disable */
import { renderApp } from './server';

// @ts-ignore: allow this
export const render = async (req, res) => {
  // @ts-ignore: allow this
  const { html } = await renderApp(req);

  res.json({ html });
};

export const routes = () => {
  return ['/', '/home', '/links', '/works', '/articles', '/contact'];
};