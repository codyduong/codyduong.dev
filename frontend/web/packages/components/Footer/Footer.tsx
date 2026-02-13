import A from 'packages/components/A';
import { cssWidth } from 'packages/components/Section';
import { LINKS } from 'packages/pages/links/Links';
import styled, { useTheme } from 'styled-components';
import T from 'packages/components/Typography';
import FooterLink from 'packages/components/Footer/FooterLink';

const FooterStyled = styled.footer`
  // background-color: ${({ theme }) => theme.color.surface[350]};
  background-color: #2c2c2c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  li {
    position: relative;
    list-style-type: none;
  }
`;

const FooterTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: ${({ theme }) => `${theme.spacing.px[200]} ${theme.spacing.px[150]} ${theme.spacing.px[300]}`};
`;

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.px[200]};

  ${cssWidth};
`;

const LinksWrapper = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  color: ${({ theme }) => theme.color.text[100]};
  gap: 8px;
  padding-left: 0px;
  flex-grow: 1;
`;

const LinkSVG = styled(A)<{ hovercolor: string; hoverbg?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;

  svg {
    width: 24px;
    height: 24px;
    padding: 2px;
    fill: currentColor;
    transform-origin: center left;
  }

  &:hover {
    background-color: ${(props) => props.hoverbg};
    svg {
      fill: ${(props) => props.hovercolor};
    }
  }
`;

const FooterGroupWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.px[400]};
  & > div {
    display: flex;
    flex-flow: row nowrap;
    flex-grow: 1;
  }
`;

const FooterGroup = styled.div`
  width: 100%;
  ul {
    margin-left: 0px;
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.px[50]};
    flex: 1 1 0;
    min-width: ${({ theme }) => theme.spacing.px(1250)};
  }
`;

const FooterHeader = styled.h4`
  ${T.P2.bold.css}
  color: ${({ theme }) => theme.color.text[100]};
  margin: 0 0 0.5rem;
`;

const Copyright = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.px[200]};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.surface[400]};
  display: flex;
  flex-direction: row wrap;
  justify-content: center;
  align-items: center;
`;

const CopyrightText = styled.span`
  ${T.P4.css}
  text-align: center;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.color.surface[100]};
`;

const Footer = (): React.JSX.Element => {
  const theme = useTheme();

  return (
    <FooterStyled tabIndex={-1}>
      <FooterTop>
        <FooterWrapper>
          <LinksWrapper aria-label="Social Links" translate="no" lang="en">
            {LINKS.map((L) => (
              <li key={L['aria-label']}>
                <LinkSVG
                  aria-label={`${L['aria-label']}`}
                  hovercolor={typeof L.hoverColor === 'function' ? L.hoverColor(theme) : L.hoverColor}
                  hoverbg={(L as unknown as Record<string, string>).hoverbg}
                  href={L.to}
                >
                  <L.icon aria-label={`${L['aria-label']}`} />
                </LinkSVG>
              </li>
            ))}
          </LinksWrapper>
          <FooterGroupWrapper>
            <div>
              <FooterGroup>
                {/* <FooterHeader aria-description="Quick navigation links">Navigate</FooterHeader>
                <ul>
                  <FooterLink to="/">Home</FooterLink>
                  <FooterLink to="/playground">Playground</FooterLink>
                  <FooterLink to="/projects">Projects</FooterLink>
                  <FooterLink to="/work">Work</FooterLink>
                </ul> */}
              </FooterGroup>
            </div>
            {/* <div>
              <FooterGroup>
                <FooterHeader aria-description="Important">Links</FooterHeader>
                <ul>
                  <FooterLink to="/web-accessibility-statement">Accessibility Statement</FooterLink>
                </ul>
              </FooterGroup>
            </div> */}
          </FooterGroupWrapper>
        </FooterWrapper>
      </FooterTop>
      <Copyright>
        <CopyrightText>
          <span aria-label="Copyright ©">©</span>2025
          <span aria-hidden>
            {'    '}|{'    '}
          </span>
          <span translate="no">
            Cody{' '}
            <span data-ssml-phoneme-alphabet="ipa" data-ssml-phoneme-ph="juʊŋg" lang="vi" translate="no">
              Duong
            </span>
          </span>
        </CopyrightText>
      </Copyright>
    </FooterStyled>
  );
};

export default Footer;
