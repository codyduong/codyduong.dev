import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkBase = styled(Link)`
  color: ${(props) => props.theme.contentEmphasized};
  text-decoration: none;
`;

export const LinkHeader = styled(LinkBase)`
  margin: 0px 15px;
`;
