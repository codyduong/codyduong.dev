import _l from 'packages/components/SpinkitLoadable';
import styled, { css } from 'styled-components';
import T from 'packages/components/Typography';
import Section from 'packages/components/Section';
import Content from 'packages/components/Content';
import A, { Link } from 'packages/components/A';
import { breakpoints, commoncss } from 'packages/style';
import Button from 'packages/components/Button';

const TopSectionWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: ${({ theme }) =>
    `${theme.spacing.px[200]} ${theme.spacing.px[150]}`};
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.spacing.px[300]});

  ${() =>
    commoncss.animation({
      enabled: css`
        transition: all 750ms;
        transition-property: padding;
      `,
    })}

  @media only screen and (min-width: ${breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.px[400]} ${theme.spacing.px[150]}`};
  }
`;

const TopSection = styled(Section)`
  /* text-align: center; */
`;

const QuickButtons = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: center;

  & > button {
    flex: 0 0 fit-content;
  }
`;

const NameHeading = styled.h2`
  ${T.Heading.H1.css}
  margin-top: 0;
`;

const Description = styled(T.P2)`
  /* margin-top: 0; */
`;

const SectionContainer = styled.div``;

const MaxWidth = styled(Section)`
  align-self: start;
  & > h2 {
    margin-top: ${({ theme }) => theme.spacing.px[200]};
  }
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
    <>
      <TopSectionWrapper>
        <TopSection maxWidth={'550px'}>
          <T.Heading.H1>Cody Duong</T.Heading.H1>
          <NameHeading>
            Modern Software Engineer exploring cutting-edge technologies
          </NameHeading>
          <Description>
            I&apos;m a software engineer from Kansas. I&apos;ve been developing
            websites, native apps, and improving developer experiences since
            2019. I&apos;m about building experimental, highly-interactive,
            accessible experiences
          </Description>
          <QuickButtons>
            <Button>View Projects</Button>
          </QuickButtons>
        </TopSection>
      </TopSectionWrapper>
      <Content>
        {/* <Construction3D /> */}
        <SectionContainer>
          <Section>
            <T.P3>
              Welcome to my personal website and{' '}
              <Link.Styled to="/playground">playground</Link.Styled>. This
              website is <abbr title="Server-Side Rendering">SSR</abbr> enabled
              and was built with React for clientside, Express for the server,
              and RazzleJS for configuration. Deployed via Google Hosting and
              Google Cloud Functions. Read more about{' '}
              <Link.Styled to="/posts/0">
                how this website was built
              </Link.Styled>{' '}
              at my <Link.Styled to="/posts">posts</Link.Styled> or check out
              the{' '}
              <A.Styled href="https://github.com/codyduong/codyduong.dev">
                repository
              </A.Styled>
              .{/* It also contains cool features like: */}
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
          <MaxWidth>
            <T.Heading.H2>About me</T.Heading.H2>
            <T.P3>
              I&apos;ve been developing websites, native apps, and improving
              developer experiences since 2019. I am passionate about
              Typescript, and am an active answerer on StackOverflow. Excited to
              work on web accessibility on the newest technologies. Working on
              fun things.
            </T.P3>
            <T.Heading.H2>
              Currently I am<span aria-hidden>...</span>
            </T.Heading.H2>
            <T.P3>
              A software engineering intern working at{' '}
              <Link.Styled to="/work/agi">AGI Digital</Link.Styled> on their
              Tier 3 Production Support Team as a Fullstack Engineer. I have
              been an intern at AGI Digital since 2021.
            </T.P3>
            <T.P3>
              A student at the{' '}
              <A.Styled href="https://ku.edu">University of Kansas</A.Styled>{' '}
              studying for my Bachelor of Science in Computer Science, and
              expecting to graduate in 2025.
            </T.P3>
            <T.P3>
              A member of GitHub&apos;s{' '}
              <AllInLink href="https://allinopensource.org">
                <AIwrapper>
                  &thinsp;<AIc aria-hidden>{'{ '}</AIc>
                  all in
                  <AIc aria-hidden>{' }'}</AIc>&thinsp;
                </AIwrapper>
                &thinsp;
                <AIu>Student Program</AIu>
              </AllInLink>{' '}
              in the 2023 Cohort.
            </T.P3>
          </MaxWidth>
        </SectionContainer>
      </Content>
    </>
  );
};

export default Home;
