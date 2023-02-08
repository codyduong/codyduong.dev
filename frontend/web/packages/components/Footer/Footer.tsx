import A, { Link } from 'packages/components/A';
import { cssWidth } from 'packages/components/Section';
import { LINKS } from 'packages/pages/links/Links';
import styled, { useTheme } from 'styled-components';

const FooterStyled = styled.footer`
  background-color: ${({ theme }) => theme.color.surface[350]};
  display: flex;
  justify-content: center;
  align-items: center;

  padding: ${({ theme }) =>
    `${theme.spacing.px[200]} ${theme.spacing.px[150]}`};
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-flow: row wrap;
  justify-content: space-between;

  ${cssWidth}
`;

const LinksWrapper = styled.section`
  display: flex;
  flex-flow: row nowrap;
  color: ${({ theme }) => theme.color.text[100]};
  gap: 8px;
`;

const LinkSVG = styled(A)<{ hovercolor: string }>`
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
    svg {
      fill: ${(props) => props.hovercolor};
    }
  }
`;

const StyledFooterLink = styled(Link)`
  color: ${({ theme }) => theme.color.text[100]};
  align-self: center;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.base[100]};
  }
`;

const Footer = (): JSX.Element => {
  const theme = useTheme();

  return (
    <FooterStyled>
      <FooterWrapper>
        <LinksWrapper>
          {LINKS.map((L) => (
            <LinkSVG
              key={L['aria-label']}
              aria-label={`${L['aria-label']}`}
              hovercolor={
                typeof L.hoverColor === 'function'
                  ? L.hoverColor(theme)
                  : L.hoverColor
              }
              href={L.to}
            >
              <L.icon aria-label={`${L['aria-label']}`} />
            </LinkSVG>
          ))}
        </LinksWrapper>
        <StyledFooterLink to="web-accessibility-statement">
          Accessibility Statement
        </StyledFooterLink>
      </FooterWrapper>
    </FooterStyled>
  );
};

export default Footer;
