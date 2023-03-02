import { breakpoints, commoncss } from 'packages/style';
import styled, { css } from 'styled-components';

const Content = styled.div<{ footerPadding?: boolean; disableMedia?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: ${({ theme }) =>
    `${theme.spacing.px[200]} ${theme.spacing.px[150]}`};
  /* margin-bottom: ${({ footerPadding }) => footerPadding && '5vw'}; */
  min-height: calc(100vh - ${({ theme }) => theme.spacing.px[300]});

  ${() =>
    commoncss.animation({
      enabled: css`
        transition: all 750ms;
        transition-property: padding;
      `,
    })}

  @media only screen and (min-width: ${breakpoints.md}) {
    padding-top: ${({ theme }) => theme.spacing.px[400]};
  }
`;

export default Content;
