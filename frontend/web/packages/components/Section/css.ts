import { breakpoints, commoncss } from 'packages/style';
import { css } from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cssWidth: any = css<{ maxWidth?: string | false }>`
  max-width: ${({ maxWidth }) =>
    typeof maxWidth === 'undefined' ? '600px' : typeof maxWidth === 'string' ? maxWidth : 'unset'};

  ${() =>
    commoncss.animation({
      enabled: css`
        transition: all 750ms ease-in-out;
        transition-property: width, max-width;
      `,
    })}

  ${() =>
    commoncss.widthlimited({
      enabled: (p) => css`
        max-width: ${p}ch;

        @media only screen and (min-width: ${breakpoints.md}) {
          max-width: ${p ? `min(60vw, ${p}ch)` : 'min(60vw, 600px)'};
        }
      `,
      disabled: () => css`
        @media only screen and (min-width: ${breakpoints.md}) {
          max-width: 60vw;
        }
      `,
    })}
`;

export const Css = css`
  width: 100%;
  /* max-width: 600px; */
  margin-bottom: ${({ theme }) => `${theme.spacing.rem[200]}`};
  font-size: calc(${(props) => props.theme.spacing.rem[100]});

  ${cssWidth}
`;
