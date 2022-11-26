import Home3D from 'packages/components/3D/Home3D';
import loadable from 'packages/components/SpinkitLoadable';
import styled from 'styled-components';

const Section = styled.section`
  height: 100%;
`;

const Construction3D = loadable(
  () => import('packages/components/3D/Construction3D')
);

const Home = (): JSX.Element => {
  return (
    <>
      <Construction3D />
      {/* <Section>
        <Home3D /> 
      </Section> */}
    </>
  );
};

export default Home;
