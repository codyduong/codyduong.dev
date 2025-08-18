import Section from 'packages/components/Section';
import T, { Paragraph } from 'packages/components/Typography';
import { Link } from 'packages/components/A';
import styled from 'styled-components';
import Head from 'packages/components/Head';
import Switch from 'packages/components/Switch';
import { useState } from 'react';
import Content from 'packages/components/Content';

const SectionContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const Diploma = styled.img`
  max-width: 100%;
`;

const TranscriptSpace = styled.div<{ height: string }>`
  height: ${({ height }) => height};
`;

const TranscriptCenter = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  p {
    text-align: center;
    margin: 0.5rem 0;
  }
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export default function KU(): React.JSX.Element {
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  return (
    <>
      <Head title={'University of Kansas Diploma'} />
      <Content>
        <SectionContainer>
          <Section>
            <T.H1>University of Kansas Diploma</T.H1>
            <Diploma
              src="/ku_diploma.png"
              alt="Diploma for Cody Duong, from University of Kansas, conferring Bachelors of Science in Computer Science"
              aria-labelledby="diploma-transcript"
            />
            <T.H2>Transcript</T.H2>
            <Switch checked={accessibilityMode} setChecked={setAccessibilityMode} label="Enable accessible viewing" />
            <TranscriptCenter>
              <T.H1 as="span" style={{ fontSize: '4rem' }}>
                The University of Kansas{' '}
              </T.H1>
              <Paragraph.P4 id="diploma-transcript">
                By the authority of the Board of Regents of the State of Kansas<br></br> and upon the recommendation of
                the faculty of the
              </Paragraph.P4>
              <TranscriptSpace aria-hidden height="1rem" />
              <T.H1 as="span">School of Engineering</T.H1>
              <TranscriptSpace aria-hidden height="2rem" />
              <Paragraph.P4>confers upon</Paragraph.P4>
              <T.H1 as="span" style={{ fontSize: '3rem' }}>
                Cody Q. Duong
              </T.H1>
              <Paragraph.P4>the degree of</Paragraph.P4>
              <TranscriptSpace aria-hidden height="2rem" />
              <T.H1 as="span">Bachelor of Science in Computer Science</T.H1>
              <Paragraph.P4>
                with all its rights, privileges, and responsibilities.<br></br> Given under the seal of the University
                of Kansas this<br></br> eighteenth day of May, two thousand and twenty-five.
              </Paragraph.P4>
            </TranscriptCenter>
            <T.H2>Validate this credential</T.H2>
            <Paragraph.P2>
              <strong>CeDiD:</strong> <span>2545-TG3F-CWGY</span> (copy CeDiD)
              <br></br>
              Validate the credential here:{' '}
              <Link.Styled to={'https://registrar.ku.edu/cecredentialsr/validation'}>
                KU CeCredential Validation
              </Link.Styled>
            </Paragraph.P2>
            {/* <Link to={'./'}></Link> */}
          </Section>
        </SectionContainer>
      </Content>
    </>
  );
}
