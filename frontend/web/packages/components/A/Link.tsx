import { Link as L } from 'react-router-dom';
import { commoncss } from 'packages/style';
import styled from 'styled-components';

export const Link = styled(L)`
  text-decoration: none;
  user-select: none;
  :hover {
    cursor: pointer;
  }
  ${commoncss.focus}
`;
