import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { ThemeProvider } from 'styled-components';
import { useThemeBase } from 'packages/style/themes';
import Bypass from 'packages/Bypass';
import Page from 'packages/pages/Page';
import { Outlet } from 'react-router';
import { ScrollProvider } from './contexts/ScrollContext';
import { HeadProvider, HeadValue } from './contexts/HeadContext';
import ErrorFallback from './ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavDirection, ViewTransitionStyles } from 'packages/components/viewTransitions';

interface AppProps {
  headValue: HeadValue | undefined;
}

export default function App({ headValue }: AppProps) {
  const [theme] = useThemeBase();

  useNavDirection();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider theme={theme}>
        <ViewTransitionStyles />
        <HeadProvider value={headValue}>
          <AccessibilityProvider>
            <ScrollProvider>
              <Bypass />
              <Page hasFooter>
                <Outlet />
              </Page>
            </ScrollProvider>
          </AccessibilityProvider>
        </HeadProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
