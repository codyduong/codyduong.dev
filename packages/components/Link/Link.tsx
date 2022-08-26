import { Link } from 'react-router-dom';
import styled from 'styled-components';

/** @deprecated */
export const LinkBase = styled(Link)`
  color: ${(props) => props.theme.color.text[100]};
  text-decoration: none;
`;
