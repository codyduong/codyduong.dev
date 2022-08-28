import Navbar from 'packages/components/Navbar';
import { breakpoints } from 'packages/style';
import styled from 'styled-components';

const PageDiv = styled.div`
  width: 100vw;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.surface[400]};
  color: ${(props) => props.theme.color.surface[400]};
`;

const PageContent = styled.main`
  flex-direction: column;
  flex: 1;
  overflow-x: hidden;
  /* 
  @media only screen and (min-width: ${breakpoints.md}) {
    padding: 1rem 2.5rem;
  }

  @media only screen and (min-width: ${breakpoints.lg}) {
    padding: 1rem 5rem;
  }

  @media only screen and (min-width: ${breakpoints.xxl}) {
    padding: 1rem 7.5rem;
  } */
`;

interface PageProps {
  children: React.ReactNode | null;
}

export default function Page(props: PageProps): JSX.Element {
  return (
    <PageDiv>
      <Navbar />
      <PageContent>{props.children}</PageContent>
    </PageDiv>
  );
}
