import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useThemeBase } from 'packages/themed';
import SpinkitLoadable from 'packages/components/SpinkitLoadable';
import {
  createStateStoreProviderValue,
  StateStoreProvider,
} from 'packages/context/StateStore';
import Page from 'packages/pages/Page';
import Links from 'packages/pages/links/Links';

const Home = SpinkitLoadable(import('packages/pages/home/'));
const NotFound = SpinkitLoadable(import('packages/pages/404/NotFound'));

function App(): JSX.Element {
  const [theme] = useThemeBase();
  const stateStore = createStateStoreProviderValue();

  return (
    <ThemeProvider theme={theme}>
      <StateStoreProvider value={stateStore}>
        <Page>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/links" element={<Links />} />
            <Route path="/works" element={null} />
            <Route path="/articles" element={null} />
            <Route path="/contact" element={null} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Page>
      </StateStoreProvider>
    </ThemeProvider>
  );
}

export default App;
