import { Typography } from 'packages/components/Typography';
import styled from 'styled-components';
import { useUrlSearchParams } from 'packages/app/contexts/UrlSearchParamsContext';
import Construction3DClient from './Construction3D.client';

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
      <CanvasSection className={theatre ? 'theatre' : ''} id="r3f-canvas">
        <Construction3DClient
          enablePan={theatre}
          enableZoom={theatre}
          enabled={theatre}
        />
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
