import Navbar from 'packages/components/Navbar';
import Footer from 'packages/components/Footer';
import { breakpoints } from 'packages/style';
import styled from 'packages/styled-components';
import { useEffect, useRef } from 'react';
import { useBypass } from 'packages/mono-app/context/BypassContext';
import { useScroll } from 'packages/mono-app/context/ScrollContext';

const PageDiv = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.surface[100]};
  color: ${(props) => props.theme.color.text[400]};
  overflow: scroll;
`;

const PageContent = styled.main`
  flex-direction: column;
  flex: 1;
  overflow-y: visible;
  padding-top: ${(props) => props.theme.spacing.rem[300]};

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
  const pageRef = useRef<HTMLDivElement>(null);
  const { setMainContent } = useBypass();
  const { setPage, setPageDirection, setPageRef } = useScroll();

  const handleScroll = (e: HTMLElementEventMap['scroll']): void => {
    // @ts-expect-error: yada
    const scrollHeight = Number(e?.currentTarget?.scrollHeight);
    // @ts-expect-error: yada
    const scrollTop = Number(e?.currentTarget?.scrollTop);
    if (!Number.isNaN(scrollTop)) {
      const newScrollValue = scrollTop == scrollHeight ? 0 : scrollTop;
      setPage((oldScrollValue) => {
        setPageDirection(
          scrollTop > oldScrollValue
            ? 'down'
            : scrollTop < oldScrollValue
            ? 'up'
            : undefined
        );
        return newScrollValue;
      });
    }
  };

  useEffect(() => {
    setMainContent(ref);
  }, [ref]);

  useEffect(() => {
    setPageRef(pageRef);
    pageRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      setPageRef(null);
      pageRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [pageRef]);

  return (
    <PageDiv ref={pageRef} tabIndex={-1}>
      <Navbar />
      <PageContent ref={ref} id="main-content" tabIndex={-1}>
        {children}
        {hasFooter && <Footer />}
      </PageContent>
    </PageDiv>
  );
}
