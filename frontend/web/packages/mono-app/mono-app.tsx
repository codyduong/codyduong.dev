import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useThemeBase } from 'packages/themed';
import loadable from 'packages/components/SpinkitLoadable';
import Page from 'packages/pages/Page';

const Home = loadable(() => import('packages/pages/Home'));
const NotFound = loadable(() => import('packages/pages/404/NotFound'));
const Construction3D = loadable(
  () => import('packages/components/3D/Construction3D'),
  { ssr: false }
);
const Links = loadable(() => import('packages/pages/links/Links'));

function App(): JSX.Element {
  const [theme] = useThemeBase();

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
