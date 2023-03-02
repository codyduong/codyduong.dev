import { breakpoints, commoncss } from 'packages/style';
import styled, { css } from 'styled-components';

export const cssWidth = css<{ maxWidth?: string | false }>`
  ${() =>
    commoncss.animation({
      enabled: css`
        transition: all 750ms ease-in-out;
        transition-property: width, max-width;
      `,
    })}

  ${({ maxWidth = '60vw' }) =>
    commoncss.widthlimited({
      enabled: (p) => css`
        max-width: ${p}ch;

        @media only screen and (min-width: ${breakpoints.md}) {
          max-width: ${p ? `min(${maxWidth}, ${p}ch)` : maxWidth};
        }
      `,
      disabled: () =>
        css`
          @media only screen and (min-width: ${breakpoints.md}) {
            max-width: ${maxWidth};
          } ;
        `,
    })};
`;

export const Css = css`
  width: 100%;
  max-width: 600px;
  margin-bottom: ${({ theme }) => `${theme.spacing.rem[200]}`};
  font-size: calc(${(props) => props.theme.spacing.rem[100]});

  ${cssWidth}
`;

export const Section = styled.section`
  ${Css}
`;

export default Object.assign(Section, {
  css: Css,
  cssWidth: cssWidth,
});
