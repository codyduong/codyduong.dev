import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useThemeBase } from 'packages/themed';
import SpinkitLoadable from 'packages/components/SpinkitLoadable';
import Page from 'packages/pages/Page';
import Links from 'packages/pages/links/Links';
import Construction3D from 'packages/components/3D/Construction3D';

const Home = SpinkitLoadable(import('packages/pages/Home'));
const NotFound = SpinkitLoadable(import('packages/pages/404/NotFound'));

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
