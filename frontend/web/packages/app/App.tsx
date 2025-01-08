import { AccessibilityProvider } from './contexts/AccessibilityContext';
import React, { Suspense, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useThemeBase } from 'packages/style/themes';
import Bypass from 'packages/Bypass';
import Page from 'packages/pages/Page';
import { Route, Routes, useLocation } from 'react-router';
import { ScrollProvider } from './contexts/ScrollContext';
import { QueryProvider } from './contexts/UrlSearchParamsContext';
import TheatreProvider from 'packages/components/3D/TheatreContext';

const Home = React.lazy(() => import('packages/pages/Home'));

const WebAccessibilityStatement = React.lazy(
  () => import('packages/pages/WebAccessibilityStatement'),
);

const Construction3D = React.lazy(
  () => import('packages/components/3D/Construction3D'),
);

const NotFound = React.lazy(() => import('packages/pages/404'));

const useBrowserQuery = (): InstanceType<typeof URLSearchParams> => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

interface AppProps {
  serverQuery: URLSearchParams | null;
}

export default function App({ serverQuery }: AppProps) {
  const [_count, _setCount] = useState(0);
  const [theme, _setTheme] = useThemeBase();
  const browserQuery = useBrowserQuery();

  return (
    <ThemeProvider theme={theme}>
      <AccessibilityProvider>
        <QueryProvider
          query={
            serverQuery && serverQuery.keys.length > 0
              ? serverQuery
              : browserQuery
          }
        >
          <TheatreProvider>
            <ScrollProvider>
              <Bypass />
              <Suspense>
                <Page hasFooter>
                  <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route
                      path="/web-accessibility-statement"
                      element={<WebAccessibilityStatement />}
                    />
                    <Route path="/playground" element={<Construction3D />} />
                    <Route path="/projects" element={<Construction3D />} />
                    <Route path="/work" element={<Construction3D />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Page>
              </Suspense>
            </ScrollProvider>
          </TheatreProvider>
        </QueryProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}
