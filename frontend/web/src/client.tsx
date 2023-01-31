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
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri:
    typeof window.__GRAPHQLURL__ === 'string'
      ? window.__GRAPHQLURL__
      : JSON.parse(window.__GRAPHQLURL__),
  fetch,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') ?? window.__TOKEN__ ?? '',
    },
  };
});

const client = new ApolloClient({
  cache:
    typeof window.__APOLLO_STATE__ === 'object'
      ? new InMemoryCache().restore(window.__APOLLO_STATE__)
      : new InMemoryCache().restore(JSON.parse(window.__APOLLO_STATE__)),
  link: authLink.concat(httpLink),
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
