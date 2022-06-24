import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useThemeBase } from 'packages/themed';
import SpinkitLoadable from 'packages/components/SpinkitLoadable';

const Home = SpinkitLoadable(import('packages/pages/home'));
const NotFound = SpinkitLoadable(import('packages/pages/404'));

function App(): JSX.Element {
  const [theme] = useThemeBase();

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
