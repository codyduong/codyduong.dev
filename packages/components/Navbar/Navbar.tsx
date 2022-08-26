import { Typography } from 'packages/components/Typography';
import styled, { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) =>
    `${props.theme.spacing.px(75)} ${props.theme.spacing.px[150]}`};
  position: sticky;
  width: 100%;
  height: ${(props) => props.theme.spacing.rem[350]};
  background-color: ${(props) => props.theme.color.surface[500]};
  box-sizing: border-box;
`;

const Name = styled(Link)`
  ${Typography.Paragraph.P2.bold.css}
  color: ${(props) => props.theme.color.text[100]};
  text-transform: uppercase;
  text-align: center;
  margin-top: 0.25em;
`;

const HamburgerButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.rem[50]};
  p {
    ${Typography.Paragraph.P3.css}
    color: ${({ theme }) => theme.color.text[100]};
    margin: 0px;
    margin-top: 0.25em;
  }
  && > svg {
    fill: ${({ theme }) => theme.color.surface[100]};
  }
`;

const Navbar = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Header>
      <Name to="/home">Cody Duong</Name>
      <HamburgerButton>
        <p>Home</p>
        <MenuIcon />
      </HamburgerButton>
    </Header>
  );
};

export default Navbar;
