import { Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useThemeBase } from 'packages/themed';
import loadable from 'packages/components/SpinkitLoadable';
import Page from 'packages/pages/Page';
import { TheatreProvider } from 'packages/components/3D/TheatreContext';
import { QueryProvider } from 'packages/mono-app/QueryContext';
import { useMemo } from 'react';

const Home = loadable(() => import('packages/pages/Home'));
const NotFound = loadable(() => import('packages/pages/404/NotFound'));
const Construction3D = loadable(
  () => import('packages/components/3D/Construction3D')
);
const Links = loadable(() => import('packages/pages/links/Links'));
const Work = loadable(() => import('packages/pages/work'));

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

  return (
    <ThemeProvider theme={theme}>
      <QueryProvider
        query={serverQuery.keys.length > 0 ? serverQuery : browserQuery}
      >
        <TheatreProvider>
          <Page>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home/" element={<Home />} />
              <Route path="/links/" element={<Links />} />
              <Route path="/work/*" element={<Work />} />
              <Route path="/articles/" element={<Construction3D />} />
              <Route path="/contact/" element={<Construction3D />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Page>
        </TheatreProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
