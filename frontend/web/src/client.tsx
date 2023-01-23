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

let graphqlLocation =
  process.env.APOLLO_SERVER_DEV ?? 'http://localhost:3002';
if (process.env.NODE_ENV === 'production') {
  graphqlLocation =
    process.env.APOLLO_SERVER_PROD ?? 'http://codyduong.dev/api';
}
if (process.env.FUNCTIONS_EMULATOR == 'true') {
  graphqlLocation =
    process.env.APOLLO_SERVER_EMULATE ?? 'http://localhost:5000/api';
}
console.log(process.env);

const client = new ApolloClient({
  cache:
    typeof window.__APOLLO_STATE__ === 'object'
      ? new InMemoryCache().restore(window.__APOLLO_STATE__)
      : new InMemoryCache().restore(JSON.parse(window.__APOLLO_STATE__)),
  link: new HttpLink({ uri: graphqlLocation, fetch }),
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
