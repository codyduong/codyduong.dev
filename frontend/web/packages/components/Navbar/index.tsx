import loadable from 'packages/components/SpinkitLoadable';

export { default } from './Navbar';

export const NavbarSettingsModal = loadable(
  () => import(/* webpackPrefetch: true */ './NavbarSettingsModal'),
  {
    ssr: false,
  }
);
