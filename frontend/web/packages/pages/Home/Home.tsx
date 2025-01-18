import styled, { css } from 'styled-components';
import T from 'packages/components/Typography';
import Section from 'packages/components/Section';
import Content from 'packages/components/Content';
import A, { Link } from 'packages/components/A';
import { breakpoints, commoncss } from 'packages/style';
import Head from 'packages/components/Head';
import { memo } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TypescriptSvg from './ts-logo-256.svg?react';
import ReactSvg from './React.svg?react';
import CSharpSvg from './CSharp.svg?react';
import DotNetSvg from './dotnet.svg?react';
import TransactSqlSvg from './icons8-microsoft-sql-server-48.svg?react';
// import JestSvg from './Jest.svg?react';
import CypressSvg from './cypress.svg?react';
import PhpSvg from './php.svg?react';
import PythonSvg from './python.svg?react';
import MySQLSvg from './mysql-icon.svg?react';

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  max-width: 80ch;

  ${() =>
    commoncss.animation({
      enabled: css`
        transition: all 750ms ease-in-out;
        transition-property: width, max-width;
      `,
    })}

  ${() =>
    commoncss.widthlimited({
      enabled: (p) => css`
        max-width: ${p}ch;
      `,
      disabled: () => css`
        @media only screen and (min-width: ${breakpoints.md}) {
          max-width: 80ch;
        }
      `,
    })}

  & > Section {
    align-self: stretch;
  }
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

const Badge = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: fit-content;
  padding: 0.25rem 0.6rem;
  border-radius: 0.75rem;
  border: solid ${({ theme }) => theme.color.surface[300]} 1px;
  font-size: calc(${(props) => props.theme.spacing.rem[87.5]});
`;

const Typescript = memo(() => (
  <Badge translate="no" lang="en">
    <TypescriptSvg aria-hidden />
    TypeScript
  </Badge>
));

const React = memo(() => (
  <Badge translate="no" lang="en">
    <ReactSvg aria-hidden />
    React
  </Badge>
));

const CSharp = memo(() => (
  <Badge translate="no" lang="en">
    <CSharpSvg aria-hidden />
    <span data-ssml-sub-alias="C Sharp">C#</span>
  </Badge>
));

const DotNet = memo(() => (
  <Badge translate="no" lang="en">
    <DotNetSvg aria-hidden />
    <span data-ssml-sub-alias="Dot Net">.NET</span>
  </Badge>
));

const TSql = memo(() => (
  <Badge translate="no" lang="en">
    <TransactSqlSvg aria-hidden />
    <span data-ssml-sub-alias="Transact SQL">T-SQL</span>
  </Badge>
));

// const Jest = memo(() => (
//   <Badge>
//     <JestSvg aria-hidden />
//     Jest
//   </Badge>
// ));

const Cypress = memo(() => (
  <Badge translate="no" lang="en">
    <CypressSvg aria-hidden />
    Cypress
  </Badge>
));

const Php = memo(() => (
  <Badge translate="no" lang="en">
    <PhpSvg aria-hidden width={24} />
    PHP
  </Badge>
));

const Python = memo(() => (
  <Badge translate="no" lang="en">
    <PythonSvg aria-hidden viewBox="0 0 111 111" width={16} height={16} />
    Python
  </Badge>
));

const MySQL = memo(() => (
  <Badge translate="no" lang="en">
    <MySQLSvg aria-hidden />
    MySQL
  </Badge>
));

const Home = (): JSX.Element => {
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
            <T.P3>22-year-old software developer from Kansas.</T.P3>
            <T.P3>
              View fun interactives at my <Link.Styled to="/playground">playground</Link.Styled>.
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
                  <span translate="no" lang="jp">
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
              <li>
                {/* https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA8 */}
                <Link.Styled to="/projects" aria-label="Read more about other projects I maintain">
                  ...and more
                </Link.Styled>
              </li>
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
            <T.P3>Under Construction</T.P3>
          </Section>
        </SectionContainer>
      </Content>
    </>
  );
};

export default Home;
