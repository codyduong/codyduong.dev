import styled, { css } from 'styled-components';
import { Typography as T } from 'packages/components/Typography';
import AGISvg from './AGI.svg';
import AGISuretrack from './AGISureTrack.svg';
import loadable from 'packages/components/SpinkitLoadable';

const Construction3DClient = loadable(
  () =>
    import(
      /* webpackPrefetch: true */ 'packages/components/3D/Construction3D.client'
    ),
  {
    ssr: false,
    fallback: undefined,
  }
);

const Main = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  transition: all 750ms;
  box-sizing: border-box;
  padding: ${({ theme }) =>
    `${theme.spacing.rem[200]} ${theme.spacing.rem[150]}`};

  & > img {
    margin: ${({ theme }) =>
      `${theme.spacing.rem[100]} 0 ${theme.spacing.rem[200]}`};
    width: 100%;
    max-width: 600px;
  }

  & > section {
    width: 100%;
    max-width: 600px;
    margin-bottom: ${({ theme }) => `${theme.spacing.rem[200]}`};
  }
`;

const Title = styled.a`
  display: flex;
`;

const Positions = styled.section`
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

const ConstructionContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  pointer-events: none;
`;

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
              june &apos;22 - <abbr>aug</abbr> &apos;21
            </T.Span2>
            <T.Span3>role: software engineering intern</T.Span3>
            <T.Span3>manager: david duncan</T.Span3>
          </Column>
        </TwoTier>
        <TwoTier>
          <Column>{/* <T.Heading.H2>digital</T.Heading.H2> */}</Column>
          <Column>
            <T.Span2>june &apos;22 - may &apos;23</T.Span2>
            <T.Span3>role: software engineering intern</T.Span3>
            <T.Span3>manager: kyle mayor</T.Span3>
          </Column>
        </TwoTier>
      </Positions>
      <img src="/suretrack-1260x840.jpg" alt="Image of Suretrack Website" />
      <section>
        <T.Heading.H2>overview</T.Heading.H2>
        <T.P3>
          AGI SureTrack is a hardware and software platform that includes
          trusted solutions for bin monitoring, automated grain conditioning,
          soil probes, and more
        </T.P3>
      </section>
      <section>
        <T.Heading.H2>work</T.Heading.H2>
        <T.P3>
          As part of the Tier 3 Production Support Team, as well as for some
          durations the Grower Delievery team I worked on general bug-fixing as
          well as implementation of new design system components for all
          developers.
        </T.P3>
      </section>
      <section>
        <T.Heading.H2>under construction</T.Heading.H2>
        <T.P3>
          The rest of this page is still under construction, please come back at
          a later time
        </T.P3>
        <ConstructionContainer>
          <Construction3DClient zoom={4} />
        </ConstructionContainer>
      </section>
    </Main>
  );
};

export default AGI;
