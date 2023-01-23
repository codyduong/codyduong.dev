import loadable from 'packages/components/SpinkitLoadable';

export const AccessibleSettingsModal = loadable(
  () => import(/* webpackPrefetch: true */ './Modal'),
  {
    ssr: false,
    fallback: undefined,
  }
);
