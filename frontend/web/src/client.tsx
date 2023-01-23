import '@fontsource/overpass';
import { BrowserRouter } from 'react-router-dom';
import { hydrateRoot } from 'react-dom/client';
import { loadableReady } from '@loadable/component';

import App from 'packages/mono-app';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import fetch from 'cross-fetch';

const client = new ApolloClient({
  cache:
    typeof window.__APOLLO_STATE__ === 'object'
      ? new InMemoryCache().restore(window.__APOLLO_STATE__)
      : new InMemoryCache().restore(JSON.parse(window.__APOLLO_STATE__)),
  link: new HttpLink({ uri: 'http://localhost:4000', fetch }),
  ssrForceFetchDelay: 100, // in milliseconds
});

loadableReady(() => {
  hydrateRoot(
    document.getElementById('root')!,
    // <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App query={null} />
      </BrowserRouter>
    </ApolloProvider>
    // </React.StrictMode>
  );
});

if (module.hot) {
  module.hot.accept();
}
