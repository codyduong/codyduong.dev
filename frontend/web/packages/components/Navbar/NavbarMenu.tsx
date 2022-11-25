import classnames from 'classnames';
import classNames from 'classnames';
import { Paragraph } from 'packages/components/Typography';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import A from 'packages/components/A';

const NavbarMenuComponent = styled.menu`
  display: flex;
  position: absolute;
  width: 100%;
  height: 0vh;
  overflow: hidden;
  z-index: 1000;
  top: ${(props) => props.theme.spacing.rem[300]};
  left: 0;
  padding: 0;
  margin: 0;

  background-color: inherit;
  transition: height 225ms ease-in-out 0s;

  &.nav-hamburger-list-open {
    height: calc(100vh - ${(props) => props.theme.spacing.rem[300]});
  }
`;

const PaddedContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: ${(props) =>
    `${props.theme.spacing.rem[100]} ${props.theme.spacing.rem[200]}`};
  /* display: flex;
  flex-flow: column nowrap;
  gap: 8px; */
`;

const StyledUL = styled.ul`
  padding: 0;
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
    color: ${(props) => props.theme.color.base[100]};
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
  height: 1px;

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
  const location = useLocation().pathname;

  const cn = classnames(className, 'navbar-link', {
    ['navbar-link-open']: location == to,
  });

  return (
    <StyledUL>
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
    </StyledUL>
  );
};

interface HamburgerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarMenu = ({ open, setOpen }: HamburgerProps): JSX.Element => {
  const hamburgerClassname = classNames('nav-hamburger-list', {
    ['nav-hamburger-list-open']: open,
  });

  return (
    <NavbarMenuComponent
      className={hamburgerClassname}
      id="nav-hamburger-list"
      role="menu"
      aria-labelledby="nav-hamburger-button"
      aria-expanded={open}
    >
      <PaddedContainer>
        <StyledLinkComponent open={open} setOpen={setOpen} to="/home/">
          home
        </StyledLinkComponent>
        <StyledLinkComponent open={open} setOpen={setOpen} to="/works/">
          works
        </StyledLinkComponent>
        <StyledLinkComponent open={open} setOpen={setOpen} to="/articles/">
          articles
        </StyledLinkComponent>
        <StyledLinkComponent open={open} setOpen={setOpen} to="/contact/">
          contact
        </StyledLinkComponent>
        <StyledLinkComponent open={open} setOpen={setOpen} to="/links/">
          links
        </StyledLinkComponent>
      </PaddedContainer>
    </NavbarMenuComponent>
  );
};

export default NavbarMenu;
