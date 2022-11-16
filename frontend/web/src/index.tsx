import React from 'react';
import ReactDOM from 'react-dom/client';
import 'packages/style/globals.css';
import '@fontsource/overpass';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from 'packages/mono-app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
