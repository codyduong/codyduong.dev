import styled from 'styled-components';
import T from 'packages/components/Typography';
// import AGISvg from './AGI.svg';
import AGISuretrack from './AGISureTrack.svg';
// import loadable from 'packages/components/SpinkitLoadable';
import Section from 'packages/components/Section';
import Content from 'packages/components/Content';

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
  transition: all 750ms;
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

const StyledAGISuretrack = styled(AGISuretrack)`
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
              june 2021 - august 2021
              {/* <abbr>jun &apos;21</abbr> - <abbr>aug &apos;21</abbr> */}
            </T.Span2>
            <T.Span3>role: software engineering intern</T.Span3>
            <T.Span3>manager: david duncan</T.Span3>
          </Column>
        </TwoTier>
        <TwoTier>
          <Column>{/* <T.Heading.H2>digital</T.Heading.H2> */}</Column>
          <Column>
            <T.Span2>
              june 2022 - may 2023
              {/* <abbr>jun &apos;22</abbr> - <abbr>may &apos;23</abbr> / present */}
            </T.Span2>
            <T.Span3>role: software engineering intern</T.Span3>
            <T.Span3>manager: kyle mayor</T.Span3>
          </Column>
        </TwoTier>
      </Positions>
      <img src="/suretrack-1260x840.jpg" alt="Image of Suretrack Website" />
      <Section>
        <T.Heading.H2>overview</T.Heading.H2>
        <T.P3>
          AGI SureTrack is a hardware and software platform that includes
          trusted solutions for bin monitoring, automated grain conditioning,
          soil probes, and more.
        </T.P3>
      </Section>
      <Section>
        <T.Heading.H2>work</T.Heading.H2>
        <T.P3>
          As part of the Tier 3 Production Support Team, as well as for some
          durations the Grower Delivery team I worked on general bug-fixing as
          well as implementation of new design system components for all
          developers.
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
              Guidance to other engineers on recommended Typescript practices
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
      </Section>
      <Section>
        <T.Heading.H2>under construction</T.Heading.H2>
        <T.P3>
          The rest of this page is still under construction, please come back at
          a later time.
        </T.P3>
        {/* <ConstructionContainer>
          <Construction3DClient zoom={4} />
        </ConstructionContainer> */}
      </Section>
    </Main>
  );
};

export default AGI;
