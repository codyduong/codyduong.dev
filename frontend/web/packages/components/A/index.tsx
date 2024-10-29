import { Link } from './Link';
import { A as a } from './A';
import styled from 'styled-components';

const A = Object.assign(
  Object.assign(a, {
    Styled: styled(a)`
      ${Link.Styled.css}
    `,
  }),
  {
    Link: Link,
  },
);

export { Link };
export default A;
