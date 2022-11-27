import loadable from 'packages/components/SpinkitLoadable';

const Construction3D = loadable(
  () => import('packages/components/3D/Construction3D')
);

const AGI = (): JSX.Element => {
  return <Construction3D />;
};

export default AGI;
