import styled, { css } from 'styled-components';

export const HeadingBaseCSS = css`
  font-family: 'Overpass';
  font-style: italic;
  font-weight: 800;
  margin: 0 0;
  color: ${(props) => props.theme.color.text[500]};
`;
const H1css = css`
  ${HeadingBaseCSS}
  font-size: ${(props) => props.theme.spacing.rem[200]};
`;
export const H1 = Object.assign(
  styled.h1`
    ${H1css}
  `,
  {
    css: H1css,
  }
);
export const H2css = css`
  ${HeadingBaseCSS}
  font-size: ${(props) => props.theme.spacing.rem[150]};
`;
export const H2 = Object.assign(
  styled.h2`
    ${H2css}
  `,
  {
    css: H2css,
  }
);
export const H3css = css`
  ${HeadingBaseCSS}
  font-size: ${(props) => props.theme.spacing.rem(137.5)};
`;
export const H3 = Object.assign(
  styled.h3`
    ${H3css}
  `,
  {
    css: H3css,
  }
);
export const H4css = css`
  ${HeadingBaseCSS}
  font-size: ${(props) => props.theme.spacing.rem[125]};
`;
export const H4 = Object.assign(
  styled.h4`
    ${H4css}
  `,
  {
    css: H4css,
  }
);
export const H5css = css`
  ${HeadingBaseCSS}
  font-size: ${(props) => props.theme.spacing.rem(112.5)};
`;
export const H5 = Object.assign(
  styled.h5`
    ${H5css}
  `,
  {
    css: H5css,
  }
);
export const H6css = css`
  ${HeadingBaseCSS}
  font-size: ${(props) => props.theme.spacing.rem[100]};
`;
export const H6 = Object.assign(
  styled.h6`
    ${H6css}
  `,
  {
    css: H6css,
  }
);
export const Heading = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
} as const;
