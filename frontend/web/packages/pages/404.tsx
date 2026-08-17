import T from 'packages/components/Typography';
import Content from 'packages/components/Content';
import Section from 'packages/components/Section';
import { Link } from 'packages/components/A';
import Head from 'packages/components/Head';
import { matchPath, useLocation } from 'react-router-dom';

// const Section = styled.section`
//   display: flex;
//   flex-flow: column nowrap;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// `;

/* eslint-disable prettier/prettier */
const PERMANENTLY_DELETED = [
  '/valentines',
  '/education/ku',
  /* eslint-enable prettier/prettier */
] as const;

export default function NotFound(): React.JSX.Element {
  const { pathname } = useLocation();

  const deleted = PERMANENTLY_DELETED.find((pattern) => matchPath(pattern, pathname));

  return (
    <>
      <Head title={'Not Found'} statusCode={deleted ? 410 : 404} />
      {!deleted && (
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
      )}
      {deleted && (
        <Content>
          <Section>
            <T.H1>Gone</T.H1>
            <T.P2>
              This page was deleted
              <br />
              <br />
              <Link.Styled to="/">Click to go home</Link.Styled>
            </T.P2>
          </Section>
        </Content>
      )}
    </>
  );
}
