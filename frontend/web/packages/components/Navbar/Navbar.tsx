import { Typography } from 'packages/components/Typography';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import A from 'packages/components/A';
import { useRef, useState, useEffect } from 'react';
import classnames from 'classnames';
import utils from 'packages/components/utils';
import NavbarMenu from './NavbarMenu';
import { useLocation } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { commoncss } from 'packages/style';
import { NavbarSettingsModal } from 'packages/components/Navbar';

const TrapFocus = styled.div`
  position: absolute;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  width: 100%;
  height: ${(props) => props.theme.spacing.rem[300]};
  background-color: ${(props) => props.theme.color.surface[400]};
  box-sizing: border-box;
  z-index: 1000;
  transition: background-color 500ms;

  &.navbar-open {
    background-color: ${(props) => props.theme.color.surface[500]};
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) =>
    `${props.theme.spacing.px(75)} ${props.theme.spacing.px[150]}`};
  position: sticky;
  width: 100%;
  height: ${(props) => props.theme.spacing.rem[300]};

  background-color: inherit;
  box-sizing: border-box;
`;

const Name = styled(A.Link)`
  ${Typography.Paragraph.P2.bold.css}
  color: ${(props) => props.theme.color.text[100]};
  text-align: center;
  padding: 0.25em 0.5em 0em;
  border-radius: ${(props) => props.theme.spacing.rem[25]};
`;

const HamburgerButton = styled.button`
  ${commoncss.focus}
  position: relative;
  display: flex;
  height: ${(props) => props.theme.spacing.rem[200]};
  padding: ${(props) => `${props.theme.spacing.rem[12.5]} 0`};
  border-radius: ${(props) => props.theme.spacing.rem[25]};
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.rem[50]};
  label {
    ${Typography.Paragraph.P3.css}
    color: ${({ theme }) => theme.color.text[100]};
    margin: 0px;
    margin-top: 0.25em;
    cursor: pointer;
    pointer-events: none;
    user-select: none;
  }
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
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

const SettingsButton = styled.button`
  ${commoncss.focus}
  position: relative;
  display: flex;
  height: ${(props) => props.theme.spacing.rem[200]};
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

const NavbarListRight = styled.ul`
  all: unset;
  display: flex;
  flex-flow: row nowrap;
  gap: 4px;
`;

const NavbarListItem = styled.li`
  all: unset;
`;

const Navbar = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [initial, setInitial] = useState(true);

  const refHeader = useRef<HTMLDivElement>(null);

  const navClassname = classnames('navbar-root', {
    ['navbar-open']: open,
    ['navbar-closed']: !open,
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
    mounted = true;
    setTimeout(() => {
      mounted && setInitial(false);
    }, 225);
    () => {
      mounted = false;
    };
  }, []);

  const location = useLocation();
  const pathnameFormatted = location.pathname.split('/')[1];
  const _currentlyAt = [
    'home',
    'work',
    'articles',
    'contact',
    'links',
  ].includes(pathnameFormatted)
    ? pathnameFormatted
    : 'home';

  return (
    <Header className={navClassname} ref={refHeader}>
      <Nav>
        <TrapFocus
          tabIndex={open ? 0 : -1}
          onFocus={() => {
            open &&
              refHeader.current &&
              utils.focusLastDescendant(refHeader.current);
          }}
        />
        <Name
          to="/"
          onClick={() => {
            setOpen(false);
          }}
        >
          codyduong
        </Name>
        <NavbarListRight>
          <NavbarListItem>
            <SettingsButton
              id="nav-hamburger-button"
              onClick={() => {
                setSettings(!settings);
              }}
              aria-label={`${settings ? 'Close' : 'Open'} Settings`}
              aria-haspopup="dialog"
              aria-controls="modal-settings"
            >
              <SettingsIcon />
            </SettingsButton>
          </NavbarListItem>
          <NavbarListItem>
            <HamburgerButton
              id="nav-hamburger-button"
              onClick={() => {
                setOpen(!open);
              }}
              aria-label={`${open ? 'Close' : 'Open'} Navigation Menu`}
              aria-haspopup="menu"
              aria-controls="nav-hamburger-list"
            >
              {/* <label htmlFor="nav-hamburger">{currentlyAt}</label> */}
              <MenuIcon
                className={hamburgerClassname('close')}
                aria-labelledby="nav-hamburger-button"
              />
              <MenuOpenIcon
                className={hamburgerClassname('open')}
                aria-labelledby="nav-hamburger-button"
              />
            </HamburgerButton>
          </NavbarListItem>
        </NavbarListRight>
        <NavbarMenu open={open} setOpen={setOpen} />
        <TrapFocus
          tabIndex={open ? 0 : -1}
          onFocus={() => {
            open &&
              refHeader.current &&
              utils.focusFirstDescendant(refHeader.current);
          }}
        />
      </Nav>
      <NavbarSettingsModal open={settings} setOpen={setSettings} />
    </Header>
  );
};

export default Navbar;
