import Section from 'packages/components/Section';
import Content from 'packages/components/Content';
import A from 'packages/components/A';
import T from 'packages/components/Typography';
import Head from 'packages/components/Head';

type WebAccessibilityStatementProps = Record<string, never>;

const WebAccessibilityStatement = (_: WebAccessibilityStatementProps): React.JSX.Element => {
  return (
    <>
      <Head title="Web Accessibility Statement" />
      <Content>
        <Section>
          <T.H1>
            Accessibility Statement for{' '}
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
            ) am commited to ensuring digital accessibility. As such, I&apos;ve done the best I could to ensuring
            compliance to various accessibility guidelines and standards to ensure the best user experience for
            everyone.
          </T.P3>
          <T.H2>Guidelines and Standards</T.H2>
          <T.P3>codyduong.web is commited to the following standards:</T.P3>
          <ul>
            <li>
              <T.P3>
                <span translate="no" lang="en">
                  <A.Styled href="https://www.w3.org/TR/WCAG21/" rel="noreferrer">
                    Web Content Accessibility Guidelines 2.1
                  </A.Styled>
                </span>{' '}
                Level{' '}
                <span translate="no" lang="en">
                  AA
                </span>{' '}
                Conformance
              </T.P3>
              <T.Div3>
                <blockquote cite="https://www.w3.org/TR/WCAG21/#abstract">
                  Following these guidelines will make content more accessible to a wider range of people with
                  disabilities, including accommodations for blindness and low vision, deafness and hearing loss,
                  limited movement, speech disabilities, photosensitivity, and combinations of these, and some
                  accommodation for learning disabilities and cognitive limitations; but will not address every user
                  need for people with these disabilities. These guidelines address accessibility of web content on
                  desktops, laptops, tablets, and mobile devices. Following these guidelines will also often make Web
                  content more usable to users in general.
                </blockquote>
              </T.Div3>
            </li>
            <li>
              <T.P3>
                <A.Styled href="https://www.w3.org/TR/wai-aria-1.1/" rel="noreferrer" translate="no" lang="en">
                  Accessible Rich Internet Applications (
                  <abbr title="Accessible Rich Internet Applications">WAI-ARIA</abbr>) 1.1 W3C Recommendations
                </A.Styled>
              </T.P3>
            </li>
          </ul>
          <T.H2>Feedback</T.H2>
          <T.P3>
            I welcome any feedback regarding accessibility at this email{' '}
            <A.Styled href="mailto:accessibility@codyduong.dev" translate="no" lang="en">
              accessibility@codyduong.dev
            </A.Styled>
          </T.P3>
        </Section>
      </Content>
    </>
  );
};

export default WebAccessibilityStatement;
