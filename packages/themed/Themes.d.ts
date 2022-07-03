import { CSSProperties, DefaultTheme } from 'styled-components';

export type ColorValue = NonNullable<CSSProperties['color']>;

declare module 'styled-components' {
  export interface DefaultTheme {
    bgDark: ColorValue;
    bg: ColorValue;
    bgHighlight: ColorValue;
    contentSecondary: ColorValue;
    base: ColorValue;
    contentPrimary: ColorValue;
    contentEmphasized: ColorValue;
    fg: ColorValue;
    fgHighlight: ColorValue;
    yellow: ColorValue;
    orange: ColorValue;
    red: ColorValue;
    magenta: ColorValue;
    violet: ColorValue;
    blue: ColorValue;
    cyan: ColorValue;
    green: ColorValue;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface ThemeProps<T> {
    // @ts-expect-error: Override Theme
    theme: DefaultTheme;
  }

  export type GetStyledComponentProps<T> = T extends StyledComponent<
    any,
    any,
    infer P,
    any
  >
    ? P
    : never;
}

export type Theme = DefaultTheme;
