import About from 'packages/pages/home/About';
import { breakpoints } from 'packages/style';
import styled from 'styled-components';

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

export default function Home(): JSX.Element {
  return (
    <>
      <About />
      <section>test</section>
    </>
  );
}
