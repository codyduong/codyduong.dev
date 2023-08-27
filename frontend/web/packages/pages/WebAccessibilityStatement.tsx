import Section from 'packages/components/Section';
import Content from 'packages/components/Content';
import A, { Link } from 'packages/components/A';
import T from 'packages/components/Typography';
import styled from 'packages/styled-components';
import { commoncss } from 'packages/style';

type WebAccessibilityStatementProps = Record<string, never>;

const WebAccessibilityStatement = (
  _: WebAccessibilityStatementProps
): JSX.Element => {
  return (
    <Content>
      <Section>
        <T.H1>Accessibility Statement for codyduong.dev</T.H1>
        <T.P2>
          I (Cody Duong) am commited to ensuring digital accessibility. As such,
          I&apos;ve done the best I could to ensuing compliance to various
          accessibility guidelines and standards to ensure the best user
          experience for everyone.
        </T.P2>
        <T.H2>Guidelines and Standards</T.H2>
        <T.P2>
          This website strives to conform to level Double-A of the World Wide
          Web Consortium (<abbr>W3C</abbr>){' '}
          <A.Styled href="https://www.w3.org/TR/WCAG21/">
            Web Content Accessibility Guidelines 2.1
          </A.Styled>
          .
        </T.P2>
        <blockquote cite="https://www.w3.org/TR/WCAG21/#abstract">
          Following these guidelines will make content more accessible to a
          wider range of people with disabilities, including accommodations for
          blindness and low vision, deafness and hearing loss, limited movement,
          speech disabilities, photosensitivity, and combinations of these, and
          some accommodation for learning disabilities and cognitive
          limitations; but will not address every user need for people with
          these disabilities. These guidelines address accessibility of web
          content on desktops, laptops, tablets, and mobile devices. Following
          these guidelines will also often make Web content more usable to users
          in general.
        </blockquote>
        <T.P2>
          As well as utilizing standards outlined by World Wide Web Consortium (
          <abbr>W3C</abbr>){' '}
          <A.Styled href="https://www.w3.org/TR/wai-aria-1.1/">
            Accessible Rich Internet Applications (
            <abbr title="Accessible Rich Internet Applications">WAI-ARIA</abbr>)
            1.1
          </A.Styled>{' '}
          to accomplish the most interactive and accessible experience.
        </T.P2>
        <T.H2>Feedback</T.H2>
        <T.P2>I welcome any feedback regarding accessibility. Contact me:</T.P2>
        <ul>
          <li>
            E-Mail:{' '}
            <A.Styled href="mailto:cody.qd@gmail.com">
              cody.qd@gmail.com
            </A.Styled>
          </li>
        </ul>
      </Section>
    </Content>
  );
};

export default WebAccessibilityStatement;
