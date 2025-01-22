import styled, { css } from 'styled-components';
import T from 'packages/components/Typography';
import Section from 'packages/components/Section';
import Content from 'packages/components/Content';
import A, { Link } from 'packages/components/A';
import { commoncss } from 'packages/style';
import Head from 'packages/components/Head';
import { useEffect, useRef } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Temporal } from '@js-temporal/polyfill';
import {
  Typescript,
  CSharp,
  DotNet,
  TSql,
  Cypress,
  Php,
  Python,
  MySQL,
  ReactBadge as React,
  NodeJS,
  ReactBadge,
  Rust,
} from 'packages/components/Badges';
import Project from 'packages/components/Project';

const SectionContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const H1Hiya = styled(T.H1)`
  font-style: italic;
`;

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const Ol = styled.ol`
  padding-top: 12px;
  padding-left: 1rem;
  margin-left: 0.5rem;
  & > li {
    position: relative;
    list-style-type: none;
    padding: 0 0 2rem 2.5rem;
    border-left: solid ${({ theme }) => theme.color.surface[300]} 1px;
    & > a {
      position: absolute;
      top: 0px;
      left: -24px;
      border: solid ${({ theme }) => theme.color.surface[300]} 1px;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  & > li:last-of-type {
    border-left: unset;
  }
`;

const Subtitle = styled(T.Span3)`
  color: ${({ theme }) => theme.color.text[400]};
  display: block;
`;

const Techs = styled.ul`
  margin-top: 0.75rem;
  padding-left: 0;
  display: flex;
  flex-flow: row wrap;
  gap: 0.75rem;
`;

const Age = styled(T.Span3)`
  font-family: monospace, monospace;
`;

const Projects = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 1ch;
  width: 100%;
`;

const Birthday = Temporal.Instant.from('2003-01-09T00:00-06:00');
const decimalPlaces = 10;

const getAge = () => {
  const diff = Temporal.Now.instant().since(Birthday);
  // i am always the same age regardless of timezone
  const years = diff.total({ unit: 'year', relativeTo: Birthday.toZonedDateTimeISO('America/Chicago') });
  // https://stackoverflow.com/a/48764436/
  const p = Math.pow(10, decimalPlaces);
  const n = years * p * (1 + Number.EPSILON);
  const yearsRounded = Math.round(n) / p;
  return yearsRounded.toFixed(decimalPlaces);
};

const Home = (): React.JSX.Element => {
  const ageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!import.meta.env.SSR) {
      const timer = setInterval(() => {
        if (ageRef.current) {
          ageRef.current.innerText = getAge();
        }
      }, 50);
      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  return (
    <>
      <Head title={'Home'} />
      <Content>
        {/* <Construction3D /> */}
        <SectionContainer>
          <Section>
            <H1Hiya>hiya 👋</H1Hiya>
            <T.P2>
              I'm{' '}
              <span translate="no">
                Cody{' '}
                <span data-ssml-phoneme-alphabet="ipa" data-ssml-phoneme-ph="juʊŋg" lang="vi">
                  Duong
                </span>
              </span>
            </T.P2>
            <T.P3>
              a{' '}
              <Age ref={ageRef} role="timer" aria-atomic translate="no" lang="en" suppressHydrationWarning>
                {getAge()}
              </Age>{' '}
              year-old software developer from Kansas.
            </T.P3>
            <T.P3>
              View fun interactive demos at my <Link.Styled to="/playground">playground</Link.Styled>.
            </T.P3>
            <T.P3>
              My primary focuses are in frontend web development have been in data vizualizations (especially 3D and
              geospatial vizualizations). I am a huge advocate for web accessibility and have done{' '}
              <abbr title="accessibility" translate="no" lang="en">
                a11y
              </abbr>{' '}
              and{' '}
              <abbr title="internationalization" translate="no" lang="en">
                i18n
              </abbr>{' '}
              work. I can do backend work as needed, and could spin up microservices and intepret API docs, but prefer
              not to.
            </T.P3>
            <T.P3>
              I am an active contributor to the{' '}
              <abbr title="Open Source Software" translate="no" lang="en">
                OSS
              </abbr>{' '}
              community. I am the primary maintainer for:
            </T.P3>
            <ul>
              <li>
                <Link.Styled
                  to="https://codyduong.github.io/hitokage/"
                  target="_blank"
                  aria-description="Opens in new window"
                  translate="no"
                  lang="en"
                >
                  hitokage{' '}
                  <span translate="no" lang="ja">
                    日と影
                  </span>{' '}
                  <OpenInNewIcon titleAccess="Open in new window" />
                </Link.Styled>
              </li>
              <li>
                <Link.Styled
                  to="https://github.com/codyduong/powershell-alias-tips"
                  target="_blank"
                  aria-description="Opens in new window"
                  translate="no"
                >
                  powershell-alias-tips <OpenInNewIcon titleAccess="Open in new window" />
                </Link.Styled>
              </li>
              {/* https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA8 */}
              {/* <li>
                <Link.Styled to="/projects" aria-label="Read more about other projects I maintain">
                  ...and more
                </Link.Styled>
              </li> */}
            </ul>
          </Section>
          <Section>
            <T.Heading.H2>Work</T.Heading.H2>
            <Ol>
              <li>
                <Link to="/work/quest-analytics" aria-labelledby="quest-analytics">
                  <img src="/quest.jpg" width="56" alt="Quest Analytics Logo" />
                </Link>
                <Subtitle>
                  <time dateTime="2023-06">Jun 2023</time> - <time dateTime="2024-12">Dec 2024</time>
                </Subtitle>
                <T.H3 id="quest-analytics" translate="no">
                  Quest Analytics
                </T.H3>
                <Subtitle>Software Engineering Intern</Subtitle>
                <Techs aria-label="Technologies">
                  <Typescript />
                  <React />
                  <CSharp />
                  <DotNet />
                  <TSql />
                </Techs>
              </li>
              <li>
                <Link to="/work/agi" aria-labelledby="agi">
                  <img src="/agi.jpg" width="56" alt="AGI Digital Logo" />
                </Link>
                <Subtitle>
                  <time dateTime="2021-05">May 2021</time> - <time dateTime="2023-06">Jun 2023</time>
                </Subtitle>
                <T.H3 id="agi" translate="no" lang="en">
                  AGI Digital
                </T.H3>
                <Subtitle>Software Engineering Intern</Subtitle>
                <Techs aria-label="Technologies">
                  <Typescript />
                  <React />
                  <Cypress />
                  {/* <Jest /> */}
                  <NodeJS />
                  <Php />
                  <Python />
                  {/* <Badge>Django</Badge> */}
                  <MySQL />
                </Techs>
              </li>
              {/* <li>
                <T.Span3>
                  [<time dateTime="2023-03">MAR 2023</time>] Student @ GitHub&apos;s{' '}
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
              </li> */}
            </Ol>
          </Section>
          <Section>
            <T.Heading.H2>Projects</T.Heading.H2>
            <br></br>
            <Projects>
              <Project
                title={
                  <>
                    hitokage{' '}
                    <span translate="no" lang="ja">
                      日と影
                    </span>{' '}
                  </>
                }
                desc="hitokage is a configurable status bar for Windows implemented in Rust using the relm4 GUI library."
                badges={
                  <Techs>
                    <Rust />
                  </Techs>
                }
              />
              <Project
                title={<>mapsy</>}
                desc={
                  <>
                    <span>HackKU 2022 - No Theme Track 2nd Place Winner</span>
                    <br />
                    <br />
                    Mapsy makes it easier to view the current status of road conditions through CCTV cameras
                  </>
                }
                badges={
                  <Techs>
                    <Typescript />
                    <ReactBadge />
                  </Techs>
                }
              />
            </Projects>
          </Section>
        </SectionContainer>
      </Content>
    </>
  );
};

export default Home;
