import T from 'packages/components/Typography';
import Content from 'packages/components/Content';
import Section from 'packages/components/Section';
import { Link } from 'packages/components/A';

// const Section = styled.section`
//   display: flex;
//   flex-flow: column nowrap;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// `;

export default function NotFound(): React.JSX.Element {
  return (
    <Content>
      <Section>
        <T.H1>Not Found</T.H1>
        <T.P2>
          This page was not found
          <br />
          <br />
          <Link.Styled to="/">Click to go home</Link.Styled>
        </T.P2>
      </Section>
    </Content>
  );
}
