import A, { Link } from 'packages/components/A';
import { LINKS } from 'packages/pages/links/Links';
import { breakpoints } from 'packages/style';
import styled, { useTheme } from 'styled-components';

const FooterStyled = styled.footer`
  background-color: ${({ theme }) => theme.color.surface[350]};
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: ${({ theme }) =>
    `${theme.spacing.px[100]} ${theme.spacing.px[150]}`};

  @media only screen and (min-width: ${breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.px[200]} calc(20vw)`};
  }
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
    </FooterStyled>
  );
};

export default Footer;
