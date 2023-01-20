import Navbar from 'packages/components/Navbar';
import Footer from 'packages/components/Footer';
import { breakpoints } from 'packages/style';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { useBypass } from 'packages/mono-app/BypassContext';

const PageDiv = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.surface[100]};
  color: ${(props) => props.theme.color.text[400]};
  overflow: hidden;
`;

const PageContent = styled.main`
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;

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
  hasFooter?: boolean;
}

export default function Page({
  children,
  hasFooter = false,
}: PageProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const { setMainContent } = useBypass();

  useEffect(() => {
    setMainContent(ref);
  }, [ref]);

  return (
    <PageDiv>
      <Navbar />
      <PageContent ref={ref} id="main-content" tabIndex={-1}>
        {children}
        {hasFooter && <Footer />}
      </PageContent>
    </PageDiv>
  );
}
