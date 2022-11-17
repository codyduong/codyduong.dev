import { commoncss } from 'packages/style';
import styled from 'styled-components';

export const A = styled.a`
  text-decoration: none;
  user-select: none;
  :hover {
    cursor: pointer;
  }
  ${commoncss.focus}
`;
