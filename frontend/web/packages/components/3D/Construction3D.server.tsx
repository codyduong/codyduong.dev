import { Typography } from 'packages/components/Typography';
import styled from 'styled-components';
import { ClientOnly } from '../ClientOnly';
import Head from '../Head';
import { useSearchParams } from 'react-router-dom';

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

export default function Construction3DServer(): React.JSX.Element {
  const [query] = useSearchParams();
  const theatre = query.has('theatrejs');

  return (
    <>
      <Head title={'Under Construction'} />
      <CanvasSection className={theatre ? 'theatre' : ''}>
        <ClientOnly component={() => import('./Construction3D.client')} />
      </CanvasSection>
      <UnderConstructionSection>
        <Typography.Heading.H1>Under Construction</Typography.Heading.H1>
        <Typography.Paragraph.P2>Code monkeys working hard to get this page done.</Typography.Paragraph.P2>
      </UnderConstructionSection>
    </>
  );
}
