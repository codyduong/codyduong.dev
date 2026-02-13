/* eslint-disable @typescript-eslint/no-unused-vars */
import T from 'packages/components/Typography';
import styled, { css } from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import A from 'packages/components/A';
import React, { useRef, useState, useEffect } from 'react';
import classnames from 'classnames';
import utils from 'packages/components/utils';
import NavbarMenu from './NavbarMenu';
import { useLocation } from 'react-router-dom';
// import SettingsIcon from '@mui/icons-material/Settings';
import { breakpoints, commoncss } from 'packages/style';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { cssWidth } from 'packages/components/Section';
import { useScroll } from 'packages/app/contexts/ScrollContext';
import { useAccessibility } from 'packages/app/contexts/AccessibilityContext';
import { AccessibleSettingsModal } from './Modals';
import useResizeObserver from 'packages/hooks/useResizeObserver';
// import { AccessibleSettingsModal } from './Modals';

const TrapFocus = styled.div`
  position: absolute;
`;

const Header = styled.header`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: ${(props) => props.theme.spacing.rem[300]};
  background-color: ${(props) => props.theme.color.surface[400]};
  box-sizing: border-box;
  z-index: 1000;
  transition: background-color 500ms;

  &.navbar-open {
    background-color: ${(props) => props.theme.color.surface[500]};
  }

  ${() =>
    commoncss.animation({
      enabled: css`
        transition:
          background-color 500ms,
          transform 500ms ease-out 100ms,
          opacity 500ms ease-out 100ms;
        opacity: 1;

        &.navbar-hide {
          transition:
            background-color 500ms,
            transform 500ms ease-in 100ms,
            opacity 500ms ease-in 100ms;
          opacity: 0;
          transform: translateY(-100%);
        }
      `,
      disabled: css`
        transition: background-color 500ms;
      `,
    })}
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: sticky;
  width: 100%;
  height: ${(props) => props.theme.spacing.rem[300]};

  background-color: inherit;
  box-sizing: border-box;

  padding: ${(props) => `${props.theme.spacing.px(75)} ${props.theme.spacing.px[150]}`};
`;

const NavInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: inherit;
  box-sizing: border-box;
  flex-grow: 1;

  ${cssWidth}
`;

const NavLink = styled(A.Link)`
  ${T.P4.css}
  color: ${(props) => props.theme.color.text[100]};
`;

const NavDiv = styled.span`
  ${T.P4.css}
  color: ${(props) => props.theme.color.text[100]};
`;

const Name = styled(NavLink)`
  ${T.P2.bold.css}
  color: ${(props) => props.theme.color.text[100]};
  text-align: center;
  padding: 0.25em 0.5em 0em;
  border-radius: ${(props) => props.theme.spacing.rem[25]};
`;

const NavButtonBase = styled.button`
  ${commoncss.focus}
  position: relative;
  display: flex;
  height: ${(props) => props.theme.spacing.px[200]};
  padding: ${(props) => `${props.theme.spacing.rem[12.5]} 0`};
  border-radius: ${(props) => props.theme.spacing.rem[25]};
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.rem[50]};
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  && > svg {
    fill: ${({ theme }) => theme.color.surface[100]};
    transition: all 225ms ease-in-out 0s;
    opacity: 1;
    transform-origin: center left;
  }
`;

const HamburgerButton = styled(NavButtonBase)`
  label {
    ${T.Paragraph.P3.css}
    color: ${({ theme }) => theme.color.text[100]};
    margin: 0px;
    margin-top: 0.25em;
    cursor: pointer;
    pointer-events: none;
    user-select: none;
  }
  && > svg {
    fill: ${({ theme }) => theme.color.surface[100]};
    transition: all 225ms ease-in-out 0s;
    opacity: 1;
    transform-origin: center left;

    &.hamburger-icon-open {
      @keyframes svg-translate {
        0% {
          opacity: 0;
          transform: scaleX(1.125);
        }
        100% {
          opacity: 1;
          transform: scaleX(1);
        }
      }
      @keyframes svg-translate-reverse {
        0% {
          opacity: 1;
          transform: scaleX(1);
        }
        100% {
          opacity: 0;
          transform: scaleX(1.125);
        }
      }
      &.hamburger-icon-opened {
        animation: svg-translate 225ms ease-in-out;
      }
      &.hamburger-icon-closed {
        animation: svg-translate-reverse 225ms ease-in-out;
        display: none;
      }
    }
    &.hamburger-icon-close {
      @keyframes svg-scale {
        0% {
          opacity: 1;
          transform: scaleX(1);
        }
        100% {
          opacity: 0;
          transform: scaleX(0.625);
        }
      }
      @keyframes svg-scale-reverse {
        0% {
          opacity: 0;
          transform: scaleX(0.625);
        }
        100% {
          opacity: 1;
          transform: scaleX(1);
        }
      }
      &.hamburger-icon-opened {
        animation: svg-scale 225ms ease-in-out;
        display: none;
      }
      &.hamburger-icon-closed {
        animation: svg-scale-reverse 225ms ease-in-out;
      }
    }
    &.hamburger-prevent-animate {
      animation-duration: 0s !important;
    }
  }
`;

const NavbarListCenter = styled.ul`
  all: unset;
  display: flex;
  flex-flow: row nowrap;
  gap: 32px;
  justify-content: space-around;
  @media screen and (max-width: ${breakpoints.lg}) {
    display: none;
  }
`;

const NavbarListRight = styled.ul`
  all: unset;
  display: flex;
  flex-flow: row nowrap;
  gap: 4px;
`;

const NavbarListItem = styled.li`
  all: unset;
`;

const HamburgerItem = styled(NavbarListItem)`
  @media not screen and (max-width: ${breakpoints.lg}) {
    display: none;
  }
`;

const Banner = styled.div`
  width: 100%;
  ${T.P2.bold.css};
  background-color: ${(props) => props.theme.color.destructive[300]};
  transition: all 225ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  box-sizing: border-box;
  max-height: 3rem;
  overflow: hidden;

  &.open {
    max-height: 10rem;
  }

  ${() =>
    commoncss.animation({
      enabled: css`
        &.scrolled {
          max-height: 0;
        }
      `,
      disabled: css`
        transition: unset;
      `,
    })}
`;

const BannerButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

const BannerButton = styled.button`
  ${T.P2.bold.css};
  margin: 0.5rem 0 0.25rem;
  color: ${(props) => props.theme.color.text[100]};
  cursor: help;
`;

const BannerInfo = styled.p`
  ${T.P3.css};
  color: ${(props) => props.theme.color.text[100]};
  text-align: center;
`;

// const PsuedoBanner = styled.div`
//   transition: all 225ms ease-in-out 0s;
// `;

const Navbar = (): React.JSX.Element => {
  const [open, setOpen] = useState(false);
  const [settings, _setSettings] = useState(false);
  const [accessibility, setAccessibility] = useState(false);
  const [initial, setInitial] = useState(true);
  const [focusWithin, setFocusWithin] = useState(false);
  const { top, pageDirection, setPageDirection } = useScroll();
  const [bannerOpen, setBannerOpen] = useState(false);
  const { disableInteractionAnimations } = useAccessibility();
  const { observe } = useResizeObserver();

  const refHeader = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  // const psuedoHeader = useRef<HTMLDivElement>(null);

  const navbarHidden = pageDirection === 'down' && !focusWithin;
  const navClassname = classnames('navbar-root', {
    ['navbar-open']: open,
    ['navbar-closed']: !open,
    ['navbar-hide']: navbarHidden,
  });
  const hamburgerClassname = (s: 'open' | 'close'): string => {
    return classnames(`hamburger-icon-${s}`, {
      ['hamburger-icon-opened']: open,
      ['hamburger-icon-closed']: !open,
      ['hamburger-prevent-animate']: initial,
    });
  };

  let mounted = false;
  useEffect(() => {
    if (navInnerRef.current)
      observe([navInnerRef.current], (_entry) => {
        // console.log(entry.contentBoxSize);
      });

    setTimeout(() => {
      if (mounted) setInitial(false);
    }, 225);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mounted = false;
    };
  }, []);

  const location = useLocation();
  const pathnameFormatted = location.pathname.split('/')[1];
  const _currentlyAt = ['home', 'work', 'posts', 'contact', 'links'].includes(pathnameFormatted)
    ? pathnameFormatted
    : 'home';

  const scrolledPastThreshold = top > 25;
  const bannerClassname = classnames('banner', {
    ['scrolled']: scrolledPastThreshold,
    ['open']: bannerOpen,
  });

  // const updateBufferHeight = useCallback(() => {
  //   if (!refHeader.current || !bannerRef.current) {
  //     return;
  //   }
  //   let baseHeight = bannerOpen
  //     ? Number(refHeader.current.scrollHeight)
  //     : Number(refHeader.current.clientHeight);
  //   let bannerHeight = bannerOpen
  //     ? `${Number(bannerRef.current.clientHeight)}px`
  //     : `3rem`;

  //   if (pageDirection === 'down' && !focusWithin) {
  //     baseHeight = 0;
  //   }

  //   if (scrolledPastThreshold) {
  //     bannerHeight = '0px';
  //   }

  //   const newHeight = `calc(${baseHeight}px + ${bannerHeight})`;

  //   if (psuedoHeader.current) {
  //     psuedoHeader.current.style.height = newHeight;
  //   }
  // }, [bannerOpen, focusWithin, pageDirection, scrolledPastThreshold]);

  // useEffect(() => {
  //   let old = null;
  //   if (bannerRef.current) {
  //     if (old) bannerRef.current.removeEventListener('transitionstart', old);
  //     bannerRef.current.addEventListener('transitionstart', updateBufferHeight);
  //     old = updateBufferHeight;
  //   }

  //   updateBufferHeight();
  // }, [refHeader, bannerRef, open, top, updateBufferHeight]);

  return (
    <>
      <Header
        className={navClassname}
        ref={refHeader}
        onFocusCapture={() => {
          setFocusWithin(true);
          setPageDirection(undefined);
        }}
        onBlurCapture={() => {
          setFocusWithin(false);
        }}
        aria-hidden={!disableInteractionAnimations ? navbarHidden : false}
      >
        <Nav>
          <TrapFocus
            tabIndex={open ? 0 : -1}
            onFocus={() => {
              if (open && refHeader.current) utils.focusLastDescendant(refHeader.current);
            }}
          />
          <NavInner ref={navInnerRef}>
            <Name
              to="/"
              onClick={() => {
                setOpen(false);
              }}
              translate="no"
              lang="en"
              viewTransition
            >
              codyduong
            </Name>
            <NavbarListCenter aria-hidden>
              {/* <NavLink
                to="/playground"
                onClick={() => {
                  setOpen(false);
                }}
              >
                playground
              </NavLink>
              <NavLink
                to="/projects"
                onClick={() => {
                  setOpen(false);
                }}
              >
                projects
              </NavLink>
              <NavLink
                to="/blog"
                onClick={() => {
                  setOpen(false);
                }}
              >
                blog
              </NavLink>
              <NavDiv aria-hidden>|</NavDiv>
              <NavLink
                to="/work"
                onClick={() => {
                  setOpen(false);
                }}
              >
                work
              </NavLink> */}
            </NavbarListCenter>
            <NavbarListRight aria-hidden>
              {/* <NavbarListItem>
            <SettingsButton
              id="nav-settings-button"
              onClick={() => {
                setSettings(!settings);
              }}
              aria-label={`${settings ? 'Close' : 'Open'} Settings`}
            aria-haspopup="dialog"
              aria-controls="modal-settings"
            >
              <SettingsIcon />
            </SettingsButton>
          </NavbarListItem> */}
              {/* <NavbarListItem>
                <NavButtonBase
                  id="nav-accessibility-button"
                  onClick={() => {
                    setAccessibility(!accessibility);
                  }}
                  aria-label={`${settings ? 'Close' : 'Open'} Accessibility Options`}
                  aria-haspopup="dialog"
                  aria-controls="modal-accessibility-settings"
                >
                  <VisibilityOutlinedIcon />
                </NavButtonBase>
              </NavbarListItem> */}
              {/* <HamburgerItem>
                <HamburgerButton
                  ref={menuButton}
                  id="nav-hamburger-button"
                  onClick={() => {
                    setOpen(!open);
                  }}
                  aria-label={`${open ? 'Close' : 'Open'} Navigation Menu`}
                  aria-haspopup="menu"
                  aria-controls="nav-hamburger-list"
                >
                  {/* <label htmlFor="nav-hamburger">{currentlyAt}</label> 
                  <MenuIcon className={hamburgerClassname('close')} aria-labelledby="nav-hamburger-button" />
                  <MenuOpenIcon className={hamburgerClassname('open')} aria-labelledby="nav-hamburger-button" />
                </HamburgerButton>
              </HamburgerItem> */}
            </NavbarListRight>
          </NavInner>
          {/* <NavbarMenu open={open} setOpen={setOpen} menuButton={menuButton} /> */}
          <TrapFocus
            tabIndex={open ? 0 : -1}
            onFocus={() => {
              if (open && refHeader.current) utils.focusFirstDescendant(refHeader.current);
            }}
          />
        </Nav>
        {/* <AccessibleSettingsModal open={accessibility} setOpen={setAccessibility} /> */}
        {/* <Banner
          ref={bannerRef}
          className={bannerClassname}
          aria-hidden={!disableInteractionAnimations && (scrolledPastThreshold || open)}
        >
          <BannerButtonWrapper>
            <BannerButton
              id="banner-button"
              aria-expanded={bannerOpen}
              aria-controls="banner-description"
              onClick={() => {
                setBannerOpen((prev) => !prev);
              }}
            >
              🚧 Under Renovation 🚧
            </BannerButton>
          </BannerButtonWrapper>
          <BannerInfo id="banner-description" aria-labelledby="banner-button">
            <q>
              My website is currently undergoing renovations. As such links or pages may be broken. Thanks for your
              understanding
            </q>{' '}
            <span translate="no" lang="en">
              - Cody
            </span>
          </BannerInfo>
        </Banner> */}
      </Header>
      {/* reserve space for header */}
      {/* <PsuedoBanner
        aria-hidden
        className={bannerClassname}
        ref={psuedoHeader}
      ></PsuedoBanner> */}
    </>
  );
};

export default Navbar;
