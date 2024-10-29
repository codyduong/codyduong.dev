import styled, { css } from 'styled-components';
import T from 'packages/components/Typography';
import Section from 'packages/components/Section';
import Content from 'packages/components/Content';
import A, { Link } from 'packages/components/A';
import { commoncss } from 'packages/style';

const SectionContainer = styled.div``;

const _MaxWidth = styled(Section)`
  align-self: start;
  & > h2 {
    margin-top: ${({ theme }) => theme.spacing.px[200]};
  }

  ${() =>
    commoncss.widthlimited({
      enabled: (p) => css`
        max-width: ${p ? `min(600px, ${p}ch)` : '600px'};
      `,
      disabled: () => css`
        max-width: 600px;
      `,
    })}
`;

// const Construction3D = loadable(
//   () => import('packages/components/3D/Construction3D')
// );
// const Home3D = loadable(() => import('packages/components/3D/Home3D'));

const AIwrapper = styled.span`
  transition: all 0.325s;
`;

const AIc = styled.span`
  transition: all 0.325s;
  color: inherit;
`;

const AIu = styled.span``;

const AllInLink = styled(A)`
  ${Link.Styled.css}

  &:hover {
    text-decoration: none;
  }
  &:hover ${AIu} {
    text-decoration: underline;
  }
  &:hover ${AIwrapper} {
    background-color: #000;
    color: #fff;
    text-decoration: none;
  }
  &:hover ${AIc} {
    color: #06f395;
    text-decoration: none;
  }
  &:focus ${AIwrapper} {
    background-color: #000;
    color: #fff;
    text-decoration: none;
  }
  &:focus ${AIc} {
    color: #06f395;
    text-decoration: none;
  }
`;

const Home = (): JSX.Element => {
  return (
    <Content>
      {/* <Construction3D /> */}
      <SectionContainer>
        <Section>
          <T.Heading.H1>Hiya 👋</T.Heading.H1>
          <T.P2>
            I&apos;m Cody{' '}
            <span data-ssml-phoneme-alphabet="ipa" data-ssml-phoneme-ph="juʊŋg">
              Duong
            </span>
            , software engineer advocating accessibility and exploring the
            bleeding edge of technologies.
          </T.P2>
          <T.P3>
            Welcome to my personal website and{' '}
            <Link.Styled to="/playground">playground</Link.Styled>.
          </T.P3>
          {/* <ul>
            <li>
              React 18
              <ul>
                <li>Concurrent React</li>
                <li>React Refresh</li>
              </ul>
            </li>

            <li>
              Loadable Components/Code Splitting
              <ul>
                <li>Both Prefetch Renders and Waterfall Rendering</li>
                <li>Suspended Loading</li>
              </ul>
            </li>

            <li>react-three-fiber</li>
          </ul>
          <T.P3>Be aware! This website is still under active development.</T.P3> */}
          {/* <Home3D />  */}
        </Section>
        <Section>
          <T.Heading.H2>About me</T.Heading.H2>
          <T.P3>
            I&apos;ve been developing websites, native apps, and improving
            developer experiences since 2019. I am passionate about Typescript,
            and Rust. I try to be an active answerer on StackOverflow. Excited
            to work on web accessibility on the newest technologies. Working on
            fun things.
          </T.P3>
          <T.Heading.H2>Currently</T.Heading.H2>
          <ul>
            <li>
              <T.Span3>
                [JUL 2023 - ] Fullstack Software Engineering Intern @{' '}
                <Link.Styled to="/work/quest-analytics">
                  Quest Analytics
                </Link.Styled>
              </T.Span3>
            </li>
            <li>
              <T.Span3>
                [AUG 2021 - ] Computer Science Student @{' '}
                <A.Styled href="https://ku.edu">University of Kansas</A.Styled>
              </T.Span3>
            </li>
          </ul>
        </Section>
        <Section>
          <T.Heading.H2>Formerly</T.Heading.H2>
          <ul>
            <li>
              <T.Span3>
                [JUL 2021 - JUL 2023] Fullstack Software Engineering Intern @{' '}
                <Link.Styled to="/work/agi">AGI Digital</Link.Styled>{' '}
              </T.Span3>
            </li>
            <li>
              <T.Span3>
                [2023] Student @ GitHub&apos;s{' '}
                <AllInLink href="https://allinopensource.org">
                  <AIwrapper>
                    &thinsp;<AIc aria-hidden>{'{ '}</AIc>
                    all in
                    <AIc aria-hidden>{' }'}</AIc>&thinsp;
                  </AIwrapper>
                  &thinsp;
                  <AIu>Student Program</AIu>
                </AllInLink>
              </T.Span3>
            </li>
          </ul>
        </Section>
      </SectionContainer>
    </Content>
  );
};

export default Home;
