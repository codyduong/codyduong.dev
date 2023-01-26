import classNames from 'classnames';
import { Paragraph } from 'packages/components/Typography';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import A from 'packages/components/A';
import color from 'color';
import CloseIcon from '@mui/icons-material/Close';
import { breakpoints, commoncss } from 'packages/style';
import Search from './NavbarSearch';
import { useState } from 'react';

const MenuItem = styled.li`
  all: unset;
  margin: 0 ${({ theme }) => theme.spacing.rem[200]};
  padding: 0;
  transition: box-shadow 0.5s ease-in-out, background-color 0.5s ease-in-out;

  &:hover {
    box-shadow: inset 100vw 0 5rem 0
      ${({ theme }) =>
        color(theme.color.surface[500])
          .mix(color(theme.color.surface[400]), 0.2)
          .string()};
  }
`;

const NavbarMenuComponent = styled.menu`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 0vh;
  overflow: hidden;
  z-index: 1000;
  top: ${(props) => props.theme.spacing.rem[300]};
  right: 0;
  padding: 0;
  margin: 0;

  background-color: inherit;
  transition: all 500ms ease-in-out 0s;
  transition-property: height, top, max-height;

  @media not screen and (min-width: ${breakpoints.xl}) {
    &.open {
      height: calc(100vh - ${(props) => props.theme.spacing.rem[300]});

      &.searching {
        height: calc(100vh - 0rem);
      }
    }
  }
  @media only screen and (min-width: ${breakpoints.xl}) {
    min-width: 600px;
    width: 50vw;
    // transform: translateX(50%) translateX(-50vw);
    transform: translateX(-10%);
    border-radius: 0 0
      ${({ theme }) => `${theme.spacing.px[100]} ${theme.spacing.px[100]}`};

    &.open {
      /* background-color: ${({ theme }) => theme.color.surface[400]}; */
      height: 400px;
    }
  }
  &.close {
    & > ${MenuItem} {
      box-shadow: inset 100vw 0 5rem 0
        ${({ theme }) => theme.color.surface[400]};
    }
  }
`;

const StyledLink = styled(A.Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  /* width: 382px; */
  /* height: 32px; */

  /* inferna-color-surface-500 */
  /* background: ${(props) => props.theme.color.surface[500]}; */

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  padding-top: 16px;
  cursor: pointer;
  ${Paragraph.P2.bold.css}
  color: ${(props) => props.theme.color.text[300]};

  &:hover {
    transition-delay: 50ms;
    color: ${(props) =>
      color(props.theme.color.base[100])
        .mix(color(props.theme.color.base[200]), 0.5)
        .string()};
  }

  &.navbar-link-open {
    color: ${(props) => props.theme.color.text[100]};
    &:hover {
      color: ${(props) => props.theme.color.base[300]};
    }
  }
`;

const LinkDivider = styled.div`
  width: 100%;
  height: max(0.05rem, 1px);

  /* inferna-color-text-400 */
  background: #404040;
  border-radius: 0.5px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

type StyledLinkComponentProps = Parameters<typeof StyledLink>[0] & {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const StyledLinkComponent = (props: StyledLinkComponentProps): JSX.Element => {
  const { to, children, className, open, setOpen, ...rest } = props;
  const location = useLocation().pathname.split('/');

  const cn = classNames(className, 'navbar-link', {
    ['navbar-link-open']: (location[1] || 'home') == to.slice(1, to.length - 1),
  });

  return (
    <MenuItem role="menuitem">
      <StyledLink
        to={to}
        className={cn}
        {...rest}
        onClick={() => {
          setOpen(false);
        }}
        tabIndex={open ? undefined : -1}
      >
        {children}
        <LinkDivider aria-hidden />
      </StyledLink>
    </MenuItem>
  );
};

// const TopPaddingDiv = styled.div`
//   min-height: 2px;
// `;

const CloseItemLi = styled.li`
  all: unset;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const CloseIconWrapper = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.color.text[400]};
  border-radius: 12px;
  margin: ${({ theme }) => theme.spacing.rem[100]} 0;
  color: ${({ theme }) => theme.color.text[100]};

  & > svg {
    fill: currentColor;
  }

  ${commoncss.focus}

  &:hover {
    transition-delay: 50ms;
    color: ${(props) =>
      color(props.theme.color.base[100])
        .mix(color(props.theme.color.base[200]), 0.5)
        .string()};
    background-color: ${({ theme }) =>
      color(theme.color.surface[500])
        .mix(color(theme.color.surface[400]), 0.2)
        .string()};
  }
`;

const SearchConstructionText = styled(Paragraph.P2)`
  text-align: center;
  color: ${({ theme }) => theme.color.text[100]};
`;

interface HamburgerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarMenu = ({ open, setOpen }: HamburgerProps): JSX.Element => {
  const [searching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const hamburgerClassname = classNames('nav-hamburger-list', {
    ['close']: !open,
    ['open']: open,
    ['searching']: searching,
  });

  return (
    <NavbarMenuComponent
      className={hamburgerClassname}
      id="nav-hamburger-list"
      role="menu"
      aria-labelledby="nav-hamburger-button"
      aria-expanded={open}
    >
      <Search
        searching={searching}
        setSearching={setSearching}
        open={open}
        value={searchValue}
        setValue={setSearchValue}
      />
      {searchValue ? (
        <MenuItem>
          <SearchConstructionText>
            Searching is not implemented yet... Come back later!
          </SearchConstructionText>
        </MenuItem>
      ) : (
        <>
          <StyledLinkComponent open={open} setOpen={setOpen} to="/home">
            home
          </StyledLinkComponent>
          <StyledLinkComponent open={open} setOpen={setOpen} to="/work">
            work
          </StyledLinkComponent>
          <StyledLinkComponent open={open} setOpen={setOpen} to="/playground">
            playground
          </StyledLinkComponent>
          <StyledLinkComponent open={open} setOpen={setOpen} to="/articles">
            articles
          </StyledLinkComponent>
          <StyledLinkComponent open={open} setOpen={setOpen} to="/contact">
            contact
          </StyledLinkComponent>
        </>
      )}
      {/* <StyledLinkComponent open={open} setOpen={setOpen} to="/links/">
        links
      </StyledLinkComponent> */}
      <CloseItemLi role="menuitem">
        <CloseIconWrapper
          tabIndex={open ? undefined : -1}
          onClick={() => setOpen(false)}
          aria-label="Close Navigation Menu"
        >
          <CloseIcon role="img" />
        </CloseIconWrapper>
      </CloseItemLi>
    </NavbarMenuComponent>
  );
};

export default NavbarMenu;
