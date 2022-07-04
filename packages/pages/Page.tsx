import Navbar from 'packages/components/Navbar/Navbar';
import { breakpoints } from 'packages/style';
import styled from 'styled-components';

const PageDiv = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.contentPrimary};
`;

const PageContent = styled.main`
  flex-direction: column;
  flex: 1;
  margin: 1rem 1rem;

  @media only screen and (min-width: ${breakpoints.md}) {
    padding: 1rem 2.5rem;
  }

  @media only screen and (min-width: ${breakpoints.lg}) {
    padding: 1rem 5rem;
  }

  @media only screen and (min-width: ${breakpoints.xxl}) {
    padding: 1rem 7.5rem;
  }
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
