import { Typography } from 'packages/components/Typography';
import styled from 'styled-components';
import { useUrlSearchParams } from 'packages/app/contexts/UrlSearchParamsContext';
import React, { Suspense, useEffect, useState } from 'react';
import type Construction3DClientType from './Construction3D.client';
import { ClientOnly } from '../ClientOnly';

const Construction3DClient = React.lazy<typeof Construction3DClientType>(() => {
  if (import.meta.env.SSR) {
    return new Promise((_resolve, reject) => {
      reject();
      // resolve({ default: () => null! });
    });
  }
  return import('./Construction3D.client');
});

const CanvasSection = styled.section`
  position: static;
  height: 60vh;
  width: 100%;
  top: ${(props) => props.theme.spacing.rem(600)};
  bottom: 0;
  &:not(.theatre) {
    pointer-events: none;
    > div {
      pointer-events: none !important;
    }
  }
  .theatre {
    pointer-events: inherit;
    > div {
      pointer-events: inherit;
    }
  }
`;

const UnderConstructionSection = styled.section`
  position: static;
  width: 100vw;
  height: 40vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  box-sizing: border-box;
  padding: ${(props) => props.theme.spacing.rem[300]};
`;

export default function Construction3DServer(): JSX.Element {
  const query = useUrlSearchParams();
  const theatre = query.has('theatrejs');

  return (
    <>
      <CanvasSection className={theatre ? 'theatre' : ''}>
        <ClientOnly component={() => import('./Construction3D.client')} />
      </CanvasSection>
      <UnderConstructionSection>
        <Typography.Heading.H2>
          This page is under construction
        </Typography.Heading.H2>
        <Typography.Paragraph.P2>
          Please come back later
        </Typography.Paragraph.P2>
      </UnderConstructionSection>
    </>
  );
}
