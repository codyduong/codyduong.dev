import { matchRoutes, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useThemeBase } from 'packages/themed';
import loadable from 'packages/components/SpinkitLoadable';
import Page from 'packages/pages/Page';
import { TheatreProvider } from 'packages/components/3D/TheatreContext';
import { QueryProvider } from 'packages/mono-app/UrlSearchParamsContext';
import { useMemo, useEffect } from 'react';
import generateTitleTag from 'titleGenerator';
import Redirect from 'packages/http/Redirect';
import { BypassProvider } from 'packages/mono-app/BypassContext';
import Bypass from 'packages/mono-app/Bypass';
import { AccessibilityProvider } from 'packages/mono-app/AccessibilityContext';

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
const Articles = loadable(
  () => import(/* webpackPrefetch: true */ 'packages/pages/Articles')
);

const useBrowserQuery = (): InstanceType<typeof URLSearchParams> => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
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

  useEffect(() => {
    if (document) {
      document.title = generateTitleTag(pathname);
    }
  }, [pathname]);

  const hasFooter =
    (
      matchRoutes(
        [
          { path: '/' },
          { path: '/home' },
          // { path: '/contact' },
          { path: '/404' },
          { path: '/work/agi' },
        ],
        pathname
      ) ?? []
    ).length > 0;

  return (
    <AccessibilityProvider>
      <ThemeProvider theme={theme}>
        <QueryProvider
          query={serverQuery.keys.length > 0 ? serverQuery : browserQuery}
        >
          <TheatreProvider>
            <BypassProvider>
              <Bypass />
              <Page hasFooter={hasFooter}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Redirect to={'/'} />} />
                  <Route path="/links" element={<Redirect to={'/contact'} />} />
                  <Route path="/work/*" element={<Work />} />
                  <Route
                    path="/web-accessibility-statement"
                    element={<WebAccessibilityStatement />}
                  />
                  <Route path="/playground" element={<Construction3D />} />
                  <Route path="/articles/*" element={<Articles />} />
                  <Route path="/contact" element={<Links />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Redirect to={'/404'} />} />
                </Routes>
              </Page>
            </BypassProvider>
          </TheatreProvider>
        </QueryProvider>
      </ThemeProvider>
    </AccessibilityProvider>
  );
}

export default App;
