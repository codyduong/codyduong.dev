import { Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useThemeBase } from 'packages/themed';
import SpinkitLoadable from 'packages/components/SpinkitLoadable';
import {
  createCrumbsProviderValue,
  CrumbsProvider,
} from 'packages/crumbs/CrumbProvider';
import {
  createStateStoreProviderValue,
  StateStoreProvider,
} from 'packages/state-store/StateStore';
import Page from 'packages/pages/Page';

const Home = SpinkitLoadable(import('packages/pages/home/Home'));
const NotFound = SpinkitLoadable(import('packages/pages/404/NotFound'));

function App(): JSX.Element {
  const [theme] = useThemeBase();
  const { crumbs, popCrumb, setCrumbs, pushCrumb } =
    createCrumbsProviderValue();
  const stateStore = createStateStoreProviderValue();
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <StateStoreProvider value={stateStore}>
        <CrumbsProvider value={{ crumbs, popCrumb, setCrumbs, pushCrumb }}>
          <Page>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Page>
        </CrumbsProvider>
      </StateStoreProvider>
    </ThemeProvider>
  );
}

export default App;
