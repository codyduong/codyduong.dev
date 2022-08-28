import classNames from 'classnames';
import styled from 'styled-components';

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
  padding: ${(props) => props.theme.spacing.rem[200]};
`;

interface HamburgerProps {
  open: boolean;
}

const NavbarMenu = ({ open }: HamburgerProps): JSX.Element => {
  const hamburgerClassname = classNames('nav-hamburger-list', {
    ['nav-hamburger-list-open']: open,
  });

  return (
    <NavbarMenuComponent
      className={hamburgerClassname}
      id="nav-hamburger-list"
      role="menu"
      aria-labelledby="nav-hamburger-button"
    >
      <PaddedContainer></PaddedContainer>
    </NavbarMenuComponent>
  );
};

export default NavbarMenu;
