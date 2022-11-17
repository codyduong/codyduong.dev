import React from 'react';
import ReactDOM from 'react-dom/client';
import 'packages/style/globals.css';
// https://github.com/webpack-contrib/style-loader/issues/461#issuecomment-593957042
document && require('@fontsource/overpass');
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from 'packages/mono-app';
import { loadableReady } from '@loadable/component';
import { hydrate } from 'react-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (process.env.SSR) {
  loadableReady(() => {
    hydrate(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById('root')
    );
  });
} else {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
