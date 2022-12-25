import { breakpoints } from 'packages/style';
import styled, { css as c } from 'styled-components';

export const css = c`
  width: 100%;
  max-width: 600px;
  margin-bottom: ${({ theme }) => `${theme.spacing.rem[200]}`};

  @media only screen and (min-width: ${breakpoints.md}) {
    max-width 60vw;
  }
`;

export const Section = styled.section`
  ${css}
`;

export default Object.assign(Section, {
  css,
});
