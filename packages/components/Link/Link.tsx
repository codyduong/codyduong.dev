import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkBase = styled(Link)`
  color: ${(props) => props.theme.contentEmphasized};
  text-decoration: none;
  margin: 0rem 1rem;
`;

export const LinkHeader = styled(LinkBase)``;
