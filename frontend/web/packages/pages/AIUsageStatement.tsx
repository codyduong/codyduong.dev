import Section from 'packages/components/Section';
import Content from 'packages/components/Content';
import A from 'packages/components/A';
import T from 'packages/components/Typography';
import { Temporal } from '@js-temporal/polyfill';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Head from 'packages/components/Head';

// https://github.com/codyduong/codyduong.dev/commit/eb62ad01c49812bcbda580c14a65b71f9e9d73c9
// 2022-06-23 21:01:43 -0500
const FirstCommit = Temporal.Instant.from('2022-06-23T21:01:43-05:00');
const decimalPlaces = 10;

const Mono = styled(T.Span3)`
  font-family: monospace, monospace;
`;

const getYears = () => {
  const diff = Temporal.Now.instant().since(FirstCommit);
  // i am always the same age regardless of timezone
  const years = diff.total({ unit: 'year', relativeTo: FirstCommit.toZonedDateTimeISO('America/Chicago') });
  // https://stackoverflow.com/a/48764436/
  const p = Math.pow(10, decimalPlaces);
  const n = years * p * (1 + Number.EPSILON);
  const yearsRounded = Math.round(n) / p;
  return yearsRounded.toFixed(decimalPlaces);
};

const AIUsageStatement = (): React.JSX.Element => {
  const yearsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!import.meta.env.SSR) {
      const timer = setInterval(() => {
        if (yearsRef.current) {
          yearsRef.current.innerText = getYears();
        }
      }, 50);
      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  return (
    <>
      <Head title="AI Usage Statement" />
      <Content>
        <Section>
          <T.H1>
            AI Usage Statement for{' '}
            <span translate="no" lang="en">
              codyduong.dev
            </span>
          </T.H1>
          <T.P3>
            I (
            <span translate="no" lang="en">
              Cody{' '}
              <span data-ssml-phoneme-alphabet="ipa" data-ssml-phoneme-ph="juʊŋg" lang="vi" translate="no">
                Duong
              </span>
            </span>
            ) did not use artificial intelligence (AI), generative artificial intelligence (gen AI), large-language
            models (LLMs), or any other similiar tooling to construct or build this website. The website was entirely
            conceived of, designed by, and architected by myself.
          </T.P3>
          <T.H2>Why</T.H2>
          <T.P3>
            This website is{' '}
            <Mono
              ref={yearsRef}
              role="timer"
              aria-live="off"
              aria-atomic
              translate="no"
              lang="en"
              suppressHydrationWarning
            >
              {getYears()}
            </Mono>{' '}
            years old{' '}
            <A.Styled
              href="https://github.com/codyduong/codyduong.dev/commit/eb62ad01c49812bcbda580c14a65b71f9e9d73c9"
              rel="noreferrer"
            >
              <Mono>eb62ad0</Mono>
            </A.Styled>
          </T.P3>
          <T.P3>
            It is the culmination of years of learning and personal experience. This website was built for me, by me,
            and wholly stands to remain that way. It's my fun website, not AI's.
          </T.P3>
          <T.P3>
            Plus this whole website, truth be told is not the cleanest most beautiful elegant piece of code. It has, is,
            and will always continue to be a work-in-progress tower that has been chopped, resewn, and mangled together.
          </T.P3>
          <T.P3>
            FYI, I'm not against AI or anything. I regularly use it in work and it's a good productivity booster. But
            I'd like to continue making my website the "old-fashioned way".
          </T.P3>
          <T.H2>Clarifications</T.H2>
          <T.Div3>
            <ul>
              <li>AI may have been used to consult, debug, or otherwise troubleshoot code snippets</li>
              <li>AI was NOT directly used in writing code</li>
            </ul>
          </T.Div3>
          <T.H2>Proof?</T.H2>
          <T.P3>
            Believe me or don't. Who cares. If I put telemetry on this page, probably like 2.5 people read it per year.
          </T.P3>
          <T.Div3>
            <ul>
              <li>
                <A.Styled href="https://web.archive.org/web/*/https://codyduong.dev/" rel="noreferrer">
                  Wayback Machine
                </A.Styled>
              </li>
              <li>
                <A.Styled href="https://github.com/codyduong/codyduong.dev/commits/master-old/" rel="noreferrer">
                  Git History (old branch)
                </A.Styled>
              </li>
              <li>
                <A.Styled href="https://github.com/codyduong/codyduong.dev/tree/master" rel="noreferrer">
                  Git History ("v2" branch)
                </A.Styled>
              </li>
            </ul>
          </T.Div3>
        </Section>
      </Content>
    </>
  );
};

export default AIUsageStatement;
