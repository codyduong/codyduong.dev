import styled from 'styled-components';
import { Paragraph } from 'packages/components/Typography';

const Section = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default function NotFound(): JSX.Element {
  return (
    <Section>
      <Paragraph.P2>This page was not found</Paragraph.P2>
      {/* <Link to={'./'}></Link> */}
    </Section>
  );
}
