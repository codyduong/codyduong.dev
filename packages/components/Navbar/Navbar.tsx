import Hamburger, {
  HamburgerList,
} from 'packages/components/Hamburger/Hamburger';
import { LinkBase, LinkHeader } from 'packages/components/Link/Link';
import { breakpoints } from 'packages/style';
import { useRef } from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flexbox;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  min-height: 32px;
  padding: 1rem 1.5rem;
  background-color: ${(props) => props.theme.bgDark};
  justify-content: space-between;

  @media only screen and (min-width: ${breakpoints.md}) {
    padding: 1rem 2.5rem;
  }

  @media only screen and (min-width: ${breakpoints.lg}) {
    padding: 1rem 5rem;
  }

  @media only screen and (min-width: ${breakpoints.xxl}) {
    padding: 1rem 7.5rem;
  }
`;

const HeaderItemGroup = styled.div`
  display: flexbox;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const HeaderItemGroupCenter = styled(HeaderItemGroup)`
  display: none;
  @media only screen and (min-width: ${breakpoints.md}) {
    display: block;
  }
`;

const HeaderIcon = styled(LinkBase)``;

const LinkGroupWrapper = styled.nav`
  display: flex;
`;

const HeaderItemGroupRight = styled(HeaderItemGroup)`
  ${LinkGroupWrapper}:nth-child(1) {
    display: none;
    @media only screen and (min-width: ${breakpoints.md}) {
      display: block;
    }
  }
  button {
    @media only screen and (min-width: ${breakpoints.md}) {
      display: none;
    }
  }
`;

const Links = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/Portfolio' },
  { label: 'Contact', to: '/Contact' },
];

const LinkGroup = (): JSX.Element => {
  return (
    <LinkGroupWrapper aria-hidden>
      {Links.map(({ to, label }) => (
        <LinkHeader id={`nav-to-${label}`} key={label} to={to}>
          {label}
        </LinkHeader>
      ))}
    </LinkGroupWrapper>
  );
};

const LinkGroupWrapperAccessible = styled(LinkGroupWrapper)`
  width: 0px;
  height: 0px;
  overflow: hidden;
`;

const LinkGroupAccessible = (): JSX.Element => {
  return (
    <LinkGroupWrapperAccessible>
      {Links.map(({ to, label }) => (
        <LinkHeader
          id={`nav-to-${label}-accessible`}
          key={label}
          to={to}
          tabIndex={-1}
          aria-label={label}
          aria-description={`Navigation to ${label} page`}
        >
          {label}
        </LinkHeader>
      ))}
    </LinkGroupWrapperAccessible>
  );
};

const hamburgerList = styled(HamburgerList)<{
  headerref: React.RefObject<HTMLDivElement>;
}>`
  top: ${({ headerref }) =>
    headerref?.current ? `${headerref.current.clientHeight}px` : '72px'};
  right: 0;
`;

export default function Navbar(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Header className="navbar" ref={ref}>
      <HeaderIcon to="/">ICON</HeaderIcon>
      <HeaderItemGroupCenter></HeaderItemGroupCenter>
      <HeaderItemGroupRight>
        <LinkGroup />
        <LinkGroupAccessible />
        <Hamburger
          hamburgerList={hamburgerList}
          headerref={ref}
          options={Links}
        />
      </HeaderItemGroupRight>
    </Header>
  );
}
