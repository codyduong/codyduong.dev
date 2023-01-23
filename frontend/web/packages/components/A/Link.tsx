import { Link as L } from 'react-router-dom';
import { commoncss } from 'packages/style';
import styled, { css } from 'styled-components';

const LBase = css`
  text-decoration: none;
  user-select: none;
  :hover {
    cursor: pointer;
  }
  transition: color 0.225s;
`;

export const L2 = styled(L)`
  ${LBase}
  ${commoncss.focus}
`;

const StyledLinkCSS = css`
  ${LBase}
  color: ${({ theme }) => theme.color.base[400]};
  ${commoncss.focus}
  &:hover {
    color: ${({ theme }) => theme.color.base[200]};
    text-decoration: underline;
  }
`;

const StyledLinkBase = styled(L)`
  ${StyledLinkCSS}
`;

export const StyledLink = Object.assign(StyledLinkBase, {
  css: StyledLinkCSS,
});

export const Link = Object.assign(L2, {
  Styled: StyledLink,
});

export default Link;
