import { Link as L, LinkProps, useNavigate } from 'react-router-dom';
import { commoncss } from 'packages/style';
import styled, { css } from 'styled-components';
import { useScroll } from 'packages/app/contexts/ScrollContext';
import { memo } from 'react';
import { flushSync } from 'react-dom';
import { useTransitionImg } from '../TransitionImg';

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

type LinkPropsAdjusted = Omit<LinkProps & React.RefAttributes<HTMLAnchorElement> & { to: string }, 'viewTransition'> & {
  viewTransition?: true | (() => void);
};

const cv = (viewTransition: true | (() => void)) => {
  if (typeof viewTransition === 'boolean') {
    return;
  }
  viewTransition();
};

const L2Wrapper = memo(({ onClick, onKeyDown, viewTransition, to, ...rest }: LinkPropsAdjusted): React.JSX.Element => {
  const { pageRef } = useScroll();
  const navigate = useNavigate();
  const { setTransitioning } = useTransitionImg();

  const scrollPageToTop = (): void => {
    if (pageRef && pageRef.current) {
      pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onClickHandler: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (viewTransition && document.startViewTransition) {
      e.preventDefault();
      document.startViewTransition(() => {
        cv(viewTransition);
        setTransitioning(true);
        navigate(to);
      });
    }
    onClick?.(e);
    scrollPageToTop();
  };
  const onKeyPressHandler: React.KeyboardEventHandler<HTMLAnchorElement> = (e) => {
    if (viewTransition && document.startViewTransition) {
      e.preventDefault();
      document.startViewTransition(() => {
        cv(viewTransition);
        setTransitioning(true);
        navigate(to);
      });
    }
    onKeyDown?.(e);
    if (e.key === 'Enter') {
      scrollPageToTop();
    }
  };

  return <L2 onClick={onClickHandler} onKeyDown={onKeyPressHandler} to={to} {...rest} />;
});

const StyledLinkCSS = css`
  ${LBase}
  color: ${({ theme }) => theme.color.base[400]};
  ${commoncss.focus}
  &:hover {
    color: ${({ theme }) => theme.color.base[300]};
    text-decoration: underline;
  }
  && svg {
    font-size: inherit;
  }
`;

const StyledLinkBase = styled(L)`
  ${StyledLinkCSS}
`;

const StyledLinkWrapper = memo(
  ({ onClick, onKeyDown, viewTransition, to, ...rest }: LinkPropsAdjusted): React.JSX.Element => {
    const { pageRef } = useScroll();
    const navigate = useNavigate();
    const { setTransitioning } = useTransitionImg();

    const scrollPageToTop = (): void => {
      if (pageRef && pageRef.current) {
        pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const onClickHandler: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      if (viewTransition) {
        e.preventDefault();
        document.startViewTransition(() => {
          cv(viewTransition);
          setTransitioning(true);
          navigate(to);
        });
      }
      onClick?.(e);
      scrollPageToTop();
    };
    const onKeyPressHandler: React.KeyboardEventHandler<HTMLAnchorElement> = (e) => {
      if (viewTransition) {
        e.preventDefault();
        document.startViewTransition(() => {
          cv(viewTransition);
          setTransitioning(true);
          navigate(to);
        });
      }
      onKeyDown?.(e);
      if (e.key === 'Enter') {
        scrollPageToTop();
      }
    };

    return <StyledLinkBase onClick={onClickHandler} onKeyDown={onKeyPressHandler} to={to} {...rest} />;
  },
);

export const StyledLink = Object.assign(StyledLinkWrapper, {
  css: StyledLinkCSS,
});

export const Link = Object.assign(L2Wrapper, {
  Styled: StyledLink,
});

export default Link;
