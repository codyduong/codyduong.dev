import { matchRoutes, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useThemeBase } from 'packages/themed';
import loadable from 'packages/components/SpinkitLoadable';
import Page from 'packages/pages/Page';
import { TheatreProvider } from 'packages/components/3D/TheatreContext';
import { QueryProvider } from 'packages/mono-app/context/UrlSearchParamsContext';
import { useMemo, useEffect } from 'react';
import generateTitleTag, { WEBSITE_NAME } from 'titleGenerator';
import Redirect from 'packages/http/Redirect';
import { BypassProvider } from 'packages/mono-app/context/BypassContext';
import Bypass from 'packages/mono-app/Bypass';
import { AccessibilityProvider } from 'packages/mono-app/context/AccessibilityContext';
import {
  TitleProvider,
  useTitle,
} from 'packages/mono-app/context/TitleContext';
import { ScrollProvider } from 'packages/mono-app/context/ScrollContext';

const Home = loadable(
  () => import(/* webpackPrefetch: true */ 'packages/pages/Home')
);
const WebAccessibilityStatement = loadable(
  () =>
    import(
      /* webpackPrefetch: true */ 'packages/pages/WebAccessibilityStatement'
    )
);
const NotFound = loadable(() => import('packages/pages/404/NotFound'));
const Construction3D = loadable(
  () =>
    import(/* webpackPrefetch: true */ 'packages/components/3D/Construction3D')
);
const Links = loadable(
  () => import(/* webpackPrefetch: true */ 'packages/pages/links/Links')
);
const Work = loadable(
  () => import(/* webpackPrefetch: true */ 'packages/pages/Work')
);
const Posts = loadable(
  () => import(/* webpackPrefetch: true */ 'packages/pages/Posts')
);

const useBrowserQuery = (): InstanceType<typeof URLSearchParams> => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

const Titler = (): null => {
  const { pathname } = useLocation();
  const { prefixOverride } = useTitle();

  useEffect(() => {
    if (document) {
      if (!prefixOverride) {
        const state = window.__APOLLO_STATE__;
        document.title = generateTitleTag(pathname, state);
      } else {
        document.title = prefixOverride + ' - ' + WEBSITE_NAME;
      }
    }
  }, [pathname, prefixOverride]);

  return null;
};

interface AppProps {
  query: Record<string, any> | null;
}

function App({ query: serverQueryUnformatted }: AppProps): JSX.Element {
  const [theme] = useThemeBase();
  const serverQuery = new URLSearchParams('');
  const browserQuery = useBrowserQuery();

  if (serverQueryUnformatted) {
    for (const [key, value] of Object.entries(serverQueryUnformatted)) {
      serverQuery.append(key, value);
    }
  }

  const { pathname } = useLocation();

  const hasFooter =
    (matchRoutes([{ path: '/lab' }], pathname) ?? []).length == 0;

  return (
    <AccessibilityProvider>
      <ThemeProvider theme={theme}>
        <QueryProvider
          query={serverQuery.keys.length > 0 ? serverQuery : browserQuery}
        >
          <TheatreProvider>
            <ScrollProvider>
              <TitleProvider>
                <Titler />
                <BypassProvider>
                  <Bypass />
                  <Page hasFooter={hasFooter}>
                    <Routes>
                      {/* eslint-disable prettier/prettier */}
                      <Route path="/" element={<Home />} />
                      <Route path="/work/*" element={<Work />} />
                      <Route path="/web-accessibility-statement" element={<WebAccessibilityStatement />} />
                      <Route path="/lab/*" element={<Construction3D />} />
                      <Route path="/posts/*" element={<Posts />} />
                      <Route path="/contact" element={<Links />} />
                      <Route path="/404" element={<NotFound />} />
                      {/* Redirects */}
                      <Route path="/home" element={<Redirect to={'/'} />} />
                      <Route path="/links" element={<Redirect to={'/contact'} />} />
                      <Route path="/playground/*" element={<Redirect.Routes to="/lab/*" />} />
                      <Route path="*" element={<Redirect to={'/404'} />} />
                      {/* eslint-enable prettier/prettier */}
                    </Routes>
                  </Page>
                </BypassProvider>
              </TitleProvider>
            </ScrollProvider>
          </TheatreProvider>
        </QueryProvider>
      </ThemeProvider>
    </AccessibilityProvider>
  );
}

export default App;
