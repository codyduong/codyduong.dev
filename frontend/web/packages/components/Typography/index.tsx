import { commoncss } from 'packages/style';
import styled, { css } from 'styled-components';

const HeadingCss = css`
  font-family: 'Overpass';
  /* font-style: italic; */
  font-weight: 600;
  margin: 0 0;
  color: ${(props) => props.theme.color.text[500]};

  &.light {
    color: ${(props) => props.theme.color.text[100]};
  }
`;
const H1css = css`
  ${HeadingCss}
  font-size: ${(props) => props.theme.spacing.rem[200]};
`;
export const H1 = Object.assign(
  styled.h1`
    ${H1css}
  `,
  {
    css: H1css,
  },
);
export const H2css = css`
  ${HeadingCss}
  font-size: ${(props) => props.theme.spacing.rem[150]};
`;
export const H2 = Object.assign(
  styled.h2`
    ${H2css}
  `,
  {
    css: H2css,
  },
);
export const H3css = css`
  ${HeadingCss}
  font-size: ${(props) => props.theme.spacing.rem(137.5)};
`;
export const H3 = Object.assign(
  styled.h3`
    ${H3css}
  `,
  {
    css: H3css,
  },
);
export const H4css = css`
  ${HeadingCss}
  font-size: ${(props) => props.theme.spacing.rem[125]};
`;
export const H4 = Object.assign(
  styled.h4`
    ${H4css}
  `,
  {
    css: H4css,
  },
);
export const H5css = css`
  ${HeadingCss}
  font-size: ${(props) => props.theme.spacing.rem(112.5)};
`;
export const H5 = Object.assign(
  styled.h5`
    ${H5css}
  `,
  {
    css: H5css,
  },
);
export const H6css = css`
  ${HeadingCss}
  font-size: ${(props) => props.theme.spacing.rem[100]};
`;
export const H6 = Object.assign(
  styled.h6`
    ${H6css}
  `,
  {
    css: H6css,
  },
);
export const Heading = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  css: HeadingCss,
} as const;

interface PCommonProps {
  widthlimited?: 'false' | boolean | undefined;
}

const PCss = css<PCommonProps>`
  font-family: 'Overpass';
  font-weight: 500;
  font-style: normal;
  /* color: ${(props) => props.theme.color.text[400]}; */

  &.light {
    color: ${(props) => props.theme.color.text[200]};
  }

  ${() =>
    commoncss.animation({
      enabled: css`
        transition: all 750ms ease-in-out;
        transition-property: width, max-width;
      `,
    })}

  ${({ widthlimited }) => {
    if (widthlimited === undefined || widthlimited === 'false' || widthlimited === false) {
      return;
    }

    return commoncss.widthlimitedflat;
  }}
`;
const ItalicCss = css`
  font-style: italic;
  font-weight: 300;
`;
const BoldCss = css`
  font-weight: 900;
  color: ${(props) => props.theme.color.text[500]};

  &.light {
    color: ${(props) => props.theme.color.text[100]};
  }
`;

const P2css = css`
  ${PCss}
  font-size: calc(${(props) => props.theme.spacing.rem[125]});
`;
const P3css = css`
  ${PCss}
  font-size: calc(${(props) => props.theme.spacing.rem[100]});
`;
const P4css = css`
  ${PCss}
  font-size: calc(${(props) => props.theme.spacing.rem[87.5]});
`;

const calculateP = (pn: ReturnType<typeof css>) => {
  return Object.assign(
    styled.p`
      ${pn}
    `,
    {
      css: pn,
      italic: Object.assign(
        styled.p`
          ${pn}
          ${ItalicCss}
        `,
        {
          css: css`
            ${pn}
            ${ItalicCss}
          `,
        },
      ),
      bold: Object.assign(
        styled.p`
          ${pn}
          ${BoldCss}
        `,
        {
          css: css`
            ${pn}
            ${BoldCss}
          `,
        },
      ),
    },
  );
};

const calculateSpan = (pn: ReturnType<typeof css>) => {
  return Object.assign(
    styled.span`
      ${pn}
    `,
    {
      css: pn,
      italic: Object.assign(
        styled.span`
          ${pn}
          ${ItalicCss}
        `,
        {
          css: css`
            ${pn}
            ${ItalicCss}
          `,
        },
      ),
      bold: Object.assign(
        styled.span`
          ${pn}
          ${BoldCss}
        `,
        {
          css: css`
            ${pn}
            ${BoldCss}
          `,
        },
      ),
    },
  );
};

export const Paragraph = {
  P2: calculateP(P2css),
  P3: calculateP(P3css),
  P4: calculateP(P4css),
} as const;
export const Span = {
  Span2: calculateSpan(P2css),
  Span3: calculateSpan(P3css),
  Span4: calculateSpan(P4css),
} as const;
const T = {
  Heading,
  ...Heading,
  Paragraph,
  ...Paragraph,
  Span,
  ...Span,
} as const;
export const Typography = T;
export default T;
