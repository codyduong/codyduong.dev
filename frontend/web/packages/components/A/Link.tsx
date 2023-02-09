import { Link as L } from 'react-router-dom';
import { commoncss } from 'packages/style';
import styled, { css } from 'styled-components';
import { useScroll } from 'packages/mono-app/context/ScrollContext';

const LBase = css`
  text-decoration: none;
  user-select: none;
  :hover {
    cursor: pointer;
  }
  transition: color 0.225s;
`;

const L2 = styled(L)`
  ${LBase}
  ${commoncss.focus}
`;

const L2Wrapper = ({
  onClick,
  ...rest
}: Parameters<typeof L2>[0]): ReturnType<typeof L2> => {
  const { pageRef } = useScroll();

  const scrollPageToTop: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    onClick?.(e);
    if (pageRef && pageRef.current) {
      pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return <L2 onClick={scrollPageToTop} {...rest} />;
};

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

const StyledLinkWrapper = ({
  onClick,
  ...rest
}: Parameters<typeof L2>[0]): ReturnType<typeof L2> => {
  const { pageRef } = useScroll();

  const scrollPageToTop: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    onClick?.(e);
    if (pageRef && pageRef.current) {
      pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return <StyledLinkBase onClick={scrollPageToTop} {...rest} />;
};

export const StyledLink = Object.assign(StyledLinkWrapper, {
  css: StyledLinkCSS,
});

export const Link = Object.assign(L2Wrapper, {
  Styled: StyledLink,
});

export default Link;
