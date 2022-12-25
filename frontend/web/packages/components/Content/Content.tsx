import { breakpoints } from 'packages/style';
import styled from 'styled-components';

const Content = styled.div<{ footerPadding?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  transition: all 750ms;
  box-sizing: border-box;
  padding: ${({ theme }) =>
    `${theme.spacing.px[200]} ${theme.spacing.px[150]}`};
  margin-bottom: ${({ footerPadding }) => footerPadding && '50vh'};

  @media only screen and (min-width: ${breakpoints.md}) {
    padding-top: ${({ theme }) => theme.spacing.px[400]};
  }
`;

export default Content;
