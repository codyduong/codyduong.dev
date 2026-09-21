import { Link as L, LinkProps, useLocation, useResolvedPath } from 'react-router-dom';
import { commoncss } from 'packages/style';
import styled, { css } from 'styled-components';
import { useScroll } from 'packages/app/contexts/ScrollContext';
import { memo } from 'react';

const LBase = css`
  text-decoration: none;
  user-select: auto;
  :hover {
    cursor: pointer;
  }
  transition: color 0.225s;
`;

const L2 = styled(L)`
  ${LBase}
  ${commoncss.focus}
`;

type LinkPropsAdjusted = LinkProps & React.RefAttributes<HTMLAnchorElement> & { to: string };

const useIsSameDestination = (to: LinkPropsAdjusted['to']) => {
  return useResolvedPath(to).pathname === useLocation().pathname;
};

const L2Wrapper = memo(({ onClick, onKeyDown, to, viewTransition, ...rest }: LinkPropsAdjusted): React.JSX.Element => {
  const { pageRef } = useScroll();
  const sameDestination = useIsSameDestination(to);

  const scrollPageToTop = (): void => {
    if (pageRef && pageRef.current) {
      pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onClickHandler: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    onClick?.(e);
    scrollPageToTop();
  };
  const onKeyPressHandler: React.KeyboardEventHandler<HTMLAnchorElement> = (e) => {
    onKeyDown?.(e);
    if (e.key === 'Enter') {
      scrollPageToTop();
    }
  };

  return (
    <L2
      onClick={onClickHandler}
      onKeyDown={onKeyPressHandler}
      to={to}
      viewTransition={viewTransition && !sameDestination}
      {...rest}
    />
  );
});

const StyledLinkCSS = css`
  ${LBase}
  color: ${({ theme }) => theme.color.link[400]};
  ${commoncss.focus}
  &:hover {
    color: ${({ theme }) => theme.color.link[500]};
    text-decoration: underline;
  }
  && svg {
    font-size: inherit;
  }
  text-decoration: underline dotted;
`;

const StyledLinkBase = styled(L)`
  ${StyledLinkCSS}
`;

const StyledLinkWrapper = memo(
  ({ onClick, onKeyDown, to, viewTransition, ...rest }: LinkPropsAdjusted): React.JSX.Element => {
    const { pageRef } = useScroll();
    const sameDestination = useIsSameDestination(to);

    const scrollPageToTop = (): void => {
      if (pageRef && pageRef.current) {
        pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const onClickHandler: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      onClick?.(e);
      scrollPageToTop();
    };
    const onKeyPressHandler: React.KeyboardEventHandler<HTMLAnchorElement> = (e) => {
      onKeyDown?.(e);
      if (e.key === 'Enter') {
        scrollPageToTop();
      }
    };

    return (
      <StyledLinkBase
        onClick={onClickHandler}
        onKeyDown={onKeyPressHandler}
        to={to}
        viewTransition={viewTransition && !sameDestination}
        {...rest}
      />
    );
  },
);

export const StyledLink = Object.assign(StyledLinkWrapper, {
  css: StyledLinkCSS,
});

export const Link = Object.assign(L2Wrapper, {
  Styled: StyledLink,
});

export default Link;
