import { AccessibilityProvider } from './contexts/AccessibilityContext';
import React, { Suspense, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useThemeBase } from 'packages/style/themes';
import Bypass from 'packages/Bypass';
import Page from 'packages/pages/Page';
import { Route, Routes } from 'react-router';
import { ScrollProvider } from './contexts/ScrollContext';
import { HeadProvider, HeadValue } from './contexts/HeadContext';
import { TransitionImgProvider } from 'packages/components/TransitionImg';
import ErrorFallback from './ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import Redirect from 'packages/components/Redirect';
import Valentines from 'packages/pages/Valentines';
import Home from 'packages/pages/Home';
import KUDiploma from 'packages/pages/Education/KU';
import WebAccessibilityStatement from 'packages/pages/WebAccessibilityStatement';
import NotFound from 'packages/pages/404';
// import lazyWithPreload from 'packages/components/lazyWithPreload';

// While this pattern is useful in larger apps, loading pages like this with SSR is jarring
// since it will result in a flash of empty content since there is no fallback on suspense...

// const Home = lazyWithPreload(() => import('packages/pages/Home/Home'));
// const KUDiploma = React.lazy(() => import('packages/pages/Education/KU'));
// const Projects = React.lazy(() => import('packages/pages/Projects'));
// const Work = React.lazy(() => import('packages/pages/Work'));
// const WebAccessibilityStatement = React.lazy(() => import('packages/pages/WebAccessibilityStatement'));
// const Construction3D = React.lazy(() => import('packages/components/3D/Construction3D'));
// const Valentines = lazyWithPreload(() => import('packages/pages/Valentines'));
// const NotFound = React.lazy(() => import('packages/pages/404'));

interface AppProps {
  headValue: HeadValue | undefined;
}

export default function App({ headValue }: AppProps) {
  const [_count, _setCount] = useState(0);
  const [theme, _setTheme] = useThemeBase();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider theme={theme}>
        <HeadProvider value={headValue}>
          <AccessibilityProvider>
            <ScrollProvider>
              <TransitionImgProvider>
                <Bypass />
                <Suspense>
                  <Routes>
                    {/* <Route path="valentines" element={<Valentines />} /> */}
                    <Route
                      path="*"
                      element={
                        <Page hasFooter>
                          <Routes>
                            <Route
                              path=""
                              element={<Home />}
                              // hmm
                              // lazy={async () => {
                              //   const Component = await Home.preload();
                              //   return { element: <Component /> };
                              // }}
                            />
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/education/ku" element={<KUDiploma />} />
                            <Route path="/web-accessibility-statement" element={<WebAccessibilityStatement />} />
                            <Route path="/playground" element={<Redirect title={'Playground'} />} />
                            <Route path="/projects/*" element={<Redirect title={'Projects'} />} />
                            <Route path="/work/*" element={<Redirect title={'Work'} />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </Page>
                      }
                    />
                  </Routes>
                </Suspense>
              </TransitionImgProvider>
            </ScrollProvider>
          </AccessibilityProvider>
        </HeadProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
