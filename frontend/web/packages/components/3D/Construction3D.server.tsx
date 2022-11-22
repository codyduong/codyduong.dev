import loadable from 'packages/components/SpinkitLoadable';
import { Typography } from 'packages/components/Typography';
import styled from 'styled-components';

const CanvasSection = styled.section`
  position: absolute;
  width: 100%;
  top: ${(props) => props.theme.spacing.rem[300]};
  bottom: 0;
`;

const UnderConstructionSection = styled.section`
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 40vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  box-sizing: border-box;
  padding: ${(props) => props.theme.spacing.rem[300]};
`;

const Construction3DClient = loadable(() => import('./Construction3D.client'), {
  ssr: false,
});

export default function Construction3DServer(): JSX.Element {
  return (
    <CanvasSection>
      <Construction3DClient />
      <UnderConstructionSection>
        <Typography.Heading.H2>
          This page is under construction
        </Typography.Heading.H2>
        <Typography.Paragraph.P2>
          Please come back later
        </Typography.Paragraph.P2>
      </UnderConstructionSection>
    </CanvasSection>
  );
}
