import Navbar from 'packages/components/Navbar';
import Footer from 'packages/components/Footer';
import { breakpoints } from 'packages/style';
import styled from 'styled-components';
import React, { Suspense, useCallback, useEffect } from 'react';
import { useScroll } from 'packages/app/contexts/ScrollContext';

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
  overflow-x: hidden;
  overflow-y: scroll;
  padding-top: ${(props) => props.theme.spacing.rem(600)};

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

function Fallback(): React.JSX.Element {
  throw new Error('you have an unhandled suspense buddy');
}

interface PageProps {
  children: React.ReactNode | null;
  hasFooter?: boolean;
}

export default function Page({ children, hasFooter = false }: PageProps): React.JSX.Element {
  const { setTop, setPageDirection, setScrollHeight, pageRef } = useScroll();

  const handleScroll = useCallback(
    (e: HTMLElementEventMap['scroll']): void => {
      // @ts-expect-error: yada
      const scrollTop = Number(e?.currentTarget?.scrollTop);
      if (!Number.isNaN(scrollTop)) {
        setTop((oldScrollValue) => {
          setPageDirection(scrollTop > oldScrollValue ? 'down' : scrollTop < oldScrollValue ? 'up' : undefined);
          return scrollTop;
        });
      }
      // @ts-expect-error: yada
      const scrollHeight = Number(e?.currentTarget?.scrollHeight);
      if (!Number.isNaN(scrollHeight)) {
        setScrollHeight(scrollHeight);
      }
    },
    [setTop, setPageDirection, setScrollHeight],
  );

  useEffect(() => {
    const currElem = pageRef?.current;
    currElem?.addEventListener('scroll', handleScroll);
    return () => {
      currElem?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, pageRef]);

  return (
    <PageDiv tabIndex={-1}>
      <Navbar />
      <PageContent ref={pageRef} tabIndex={-1} id="page-content">
        <Suspense fallback={<Fallback />}>
          {children}
          {hasFooter && <Footer />}
        </Suspense>
      </PageContent>
    </PageDiv>
  );
}
