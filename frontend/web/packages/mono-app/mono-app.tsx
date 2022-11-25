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

const useBrowserQuery = (): InstanceType<typeof URLSearchParams> => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

interface AppProps {
  query: Record<string, any> | null;
}

function App({ query: q }: AppProps): JSX.Element {
  const [theme] = useThemeBase();
  const query = useBrowserQuery();

  console.log(q, query);

  return (
    <ThemeProvider theme={theme}>
      <TheatreProvider>
        <QueryProvider query={q ?? query}>
          <Page>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/links" element={<Links />} />
              <Route path="/works" element={<Construction3D />} />
              <Route path="/articles" element={<Construction3D />} />
              <Route path="/contact" element={<Construction3D />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Page>
        </QueryProvider>
      </TheatreProvider>
    </ThemeProvider>
  );
}

export default App;
