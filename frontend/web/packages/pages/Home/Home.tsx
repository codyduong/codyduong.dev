import _l from 'packages/components/SpinkitLoadable';
import styled, { css } from 'styled-components';
import T from 'packages/components/Typography';
import Section from 'packages/components/Section';
import A, { Link } from 'packages/components/A';
import { breakpoints, commoncss } from 'packages/style';
import Button from 'packages/components/Button';
import FeedIcon from '@mui/icons-material/Feed';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const TopSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: ${({ theme }) =>
    `${theme.spacing.px[200]} ${theme.spacing.px[150]} 0`};
  margin-bottom: ${({ theme }) => theme.spacing.px[200]};
  width: 100%;
  min-height: calc(90vh - ${({ theme }) => theme.spacing.rem[300]});

  ${() =>
    commoncss.animation({
      enabled: css`
        transition: all 750ms;
        transition-property: padding;
      `,
    })}

  @media only screen and (min-width: ${breakpoints.md}) {
    padding: ${({ theme }) =>
      `${theme.spacing.px[400]} ${theme.spacing.px[150]} 0`};
  }
`;

const SectionInner = styled.div`
  ${Section.css}
  ${T.P2.size}
`;

const QuickButtons = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.px[100]};
  margin-top: 1em;

  & > button {
    flex: 0 1 fit-content;
    text-transform: lowercase;
  }

  &::after {
    content: '';
    display: flex;
    flex: 10 1 0;
  }
`;

const NameHeading = styled(T.H1)`
  font-size: ${(props) => props.theme.spacing.rem[400]};
  text-transform: lowercase;
`;

const Heading2 = styled(T.H2)`
  margin-top: 0;
  font-size: ${(props) => props.theme.spacing.rem[250]};
  text-transform: lowercase;
`;

const Tagline = styled(T.H2)`
  margin-top: 0;
  text-transform: lowercase;
`;

const Description = styled(T.P2)`
  /* margin-top: 0; */
`;

const MiddleSection = styled(TopSection)`
  justify-content: flex-start;
  padding-top: unset;
  padding-bottom: unset;
  min-height: 50vh;
  margin-top: ${({ theme }) => theme.spacing.rem[300]};
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

const ScrollBehavior: ScrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
};

const Home = (): JSX.Element => {
  const { hash } = useLocation();
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hash) {
      if (hash === '#about' && aboutRef.current) {
        aboutRef.current.scrollIntoView(ScrollBehavior);
      }
    }
  }, []);

  return (
    <>
      <TopSection>
        <SectionInner maxWidth={'600px'}>
          <NameHeading>Cody Duong</NameHeading>
          <Tagline>
            Fullstack Software Engineer exploring cutting-edge technologies
          </Tagline>
          <QuickButtons>
            <Button
              onClick={() => {
                projectsRef.current?.scrollIntoView(ScrollBehavior);
              }}
            >
              View Projects
            </Button>
            <Button
              onClick={() => {
                contactRef.current?.scrollIntoView(ScrollBehavior);
              }}
            >
              Get in Touch
            </Button>
            <Button hierarchy="secondary">
              <FeedIcon />
              Resume
            </Button>
          </QuickButtons>
        </SectionInner>
      </TopSection>
      <MiddleSection ref={aboutRef}>
        <SectionInner maxWidth="768px">
          <Heading2>About</Heading2>
          <Description>
            I&apos;m a self-taught software engineer from Kansas. I&apos;ve been
            developing websites, native apps, and improving developer
            experiences since 2019. I&apos;m about building experimental,
            highly-interactive, accessible experiences.
          </Description>
          <Description>
            I&apos;m currently a Software Engineering Intern at{' '}
            <Link.Styled to="/work/agi">AGI Digital</Link.Styled> and student at{' '}
            <A.Styled href="https://ku.edu">The University of Kansas</A.Styled>{' '}
            pursuing a Bachelor of Science in Computer Science.
          </Description>
        </SectionInner>
      </MiddleSection>
      <MiddleSection ref={projectsRef}>
        <SectionInner maxWidth="768px">
          <Heading2>Projects</Heading2>
          <Description>
            Showcase of full-stack work and experiments with web technologies.
          </Description>
        </SectionInner>
      </MiddleSection>
      <MiddleSection ref={contactRef}>
        <SectionInner maxWidth="768px">
          <Heading2>Contact Me</Heading2>
          <Description>
            Contact me to provide feedback or about professional inquries
          </Description>
        </SectionInner>
      </MiddleSection>
    </>
  );
};

export default Home;
