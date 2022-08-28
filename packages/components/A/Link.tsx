import { Link } from 'react-router-dom';
import { commoncss } from 'packages/style';
import styled from 'styled-components';

export const LinkBase = styled(Link)`
  color: ${(props) => props.theme.color.text[100]};
  text-decoration: none;
  user-select: none;
  :hover {
    cursor: pointer;
  }
  ${commoncss.focus}
`;
