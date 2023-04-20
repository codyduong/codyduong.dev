import styled from 'styled-components';
import T from 'packages/components/Typography';
// import AGISvg from './AGI.svg';
import AGISuretrack from './AGISureTrack.svg';
// import loadable from 'packages/components/SpinkitLoadable';
import Section from 'packages/components/Section';
import Content from 'packages/components/Content';
import { commoncss } from 'packages/style';

// const Construction3DClient = loadable(
//   () =>
//     import(
//       /* webpackPrefetch: true */ 'packages/components/3D/Construction3D.client'
//     ),
//   {
//     ssr: false,
//     fallback: undefined,
//   }
// );

const Main = styled(Content)`
  & > img {
    margin: ${({ theme }) =>
      `${theme.spacing.px[100]} 0 ${theme.spacing.px[200]}`};
    width: 100%;
    max-width: 600px;
  }
`;

const Title = styled.a`
  display: flex;
`;

const Positions = styled(Section)`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  margin-top: ${({ theme }) => `${theme.spacing.rem[200]}`};
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${({ theme }) => `${theme.spacing.rem[200]}`};
`;

const TwoTier = styled.div`
  display: flex;
  flex-flow: row-reverse nowrap;
  justify-content: space-between;
  align-self: stretch;
  gap: ${({ theme }) => `${theme.spacing.rem[200]}`};
`;

const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;

  & > p {
    margin: 0;
  }
`;

// const ConstructionContainer = styled.div`
//   width: 100%;
//   aspect-ratio: 1;
//   pointer-events: none;
// `;

const StyledAGISuretrack = styled(AGISuretrack as any)`
  max-height: 4rem;
`;

const AGI = (): JSX.Element => {
  return (
    <Main>
      <Title href={'https://www.agisuretrack.com/'}>
        {/* <AGISvg /> */}
        <StyledAGISuretrack />
      </Title>
      <Positions>
        <TwoTier>
          <Column>{/* <T.Heading.H2>suretrack</T.Heading.H2> */}</Column>
          <Column>
            <T.Span2>
              June 2021 - August 2021
              {/* <abbr>jun &apos;21</abbr> - <abbr>aug &apos;21</abbr> */}
            </T.Span2>
            <T.Span3>Location: Lenexa, Kansas @ AGI SureTrack</T.Span3>
            <T.Span3>Role: Software Engineering Intern</T.Span3>
            <T.Span3>Manager: David Duncan</T.Span3>
          </Column>
        </TwoTier>
        <TwoTier>
          <Column>{/* <T.Heading.H2>digital</T.Heading.H2> */}</Column>
          <Column>
            <T.Span2>
              June 2022 - May 2023
              {/* <abbr>jun &apos;22</abbr> - <abbr>may &apos;23</abbr> / present */}
            </T.Span2>
            <T.Span3>Location: Leawood, Kansas @ AGI Digital</T.Span3>
            <T.Span3>Role: Software Engineering Intern</T.Span3>
            <T.Span3>Manager: Kyle Mayor</T.Span3>
          </Column>
        </TwoTier>
      </Positions>
      <img src="/suretrack-1260x840.jpg" alt="SureTrack Website" />
      <Section>
        <T.Heading.H2>Overview</T.Heading.H2>
        <T.P3>
          AGI Digital, formerly AGI SureTrack, is a hardware and software
          platform that includes trusted solutions for bin monitoring, automated
          grain conditioning, soil probes, and more.
        </T.P3>
      </Section>
      <Section>
        <T.Heading.H2>Work</T.Heading.H2>
        <T.P3>
          I was a Fullstack Software Engineering Intern. As part of the Tier 3
          Production Support team would work on general bug-fixing throughout
          the entire platform. As part of the Grower Delivery team I worked on
          implementation of new design system components for all developers with
          emphasis on ease of migration and maintaining same design patterns and
          backwards compatibility with components to be deprecated
        </T.P3>
        <T.P3>
          I have also been given wide latitude within AGI to explore projects
          such as:
        </T.P3>
        <ul>
          <li>
            Typescript Refactor Initiative
            <ul>
              <li>Write documentation for new code standards</li>
            </ul>
            <ul>
              <li>Keeping Typescript up-to-date with latest releases</li>
              <li>
                Guidance to other engineers on recommended Typescript practices
                via Knowledge Transfers
              </li>
            </ul>
          </li>
          <li>
            Implement new Modal/Dialog component as part of Design System
            overhaul
            <ul>
              <li>
                Write robust and extendable React component with backwards
                compatibility layer
              </li>
              <li>Following W3 Aria Recommendations on Dialog components</li>
            </ul>
          </li>
          <li>
            Migrate Codebase Linting Rules
            <ul>
              <li>
                Migrate Codebase from Prettier 1 to 2 in order to accomdate new
                TypeScript features
              </li>
              <li>
                Write script to incrementally migrate codebase to avoid merge
                conflicts and avoid delaying product delivery deadlines
              </li>
            </ul>
          </li>
        </ul>
        <T.P3>
          At AGI Digital/SureTrack I worked with the following
          technologies/frameworks:
        </T.P3>
        <ul>
          <li>Typescript React w/ Typescript NodeJS (SureTrack Application)</li>
          <li>
            Javascript React w/ Python Django Backend (Data Engine Application)
          </li>
          <li>PHP (legacy backend)</li>
          <li>GraphQL</li>
          <li>MySQL 5/8</li>
          <li>Redis</li>
          <li>
            Amazon Web Services (AWS)
            <ul>
              <li>S3</li>
              <li>ECS</li>
              <li>DynamoDB</li>
              <li>RDS</li>
              <li>SQS</li>
            </ul>
          </li>
          <li>Docker-Compose / Docker</li>
        </ul>
      </Section>
      {/* <Section>
        <T.Heading.H2>Under Construction</T.Heading.H2>
        <T.P3>
          The rest of this page is still under construction, please come back at
          a later time.
        </T.P3>
        <ConstructionContainer>
          <Construction3DClient zoom={4} />
        </ConstructionContainer>
      </Section> */}
    </Main>
  );
};

export default AGI;
