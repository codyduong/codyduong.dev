import { CSSProperties, DefaultTheme } from 'styled-components';

export type ColorValue = NonNullable<CSSProperties['color']>;

declare module 'styled-components' {
  export interface DefaultTheme {
    content: {
      l400: string;
      l300: string;
      /** text emphasized */
      l200: string;
      l100: string;
      /** text */
      base: string;
      d100: string;
      /** text secondary */
      d200: string;
      d300: string;
      d400: string;
    };
    primary: {
      l400: string;
      l300: string;
      l200: string;
      l100: string;
      /** foreground */
      base: string;
      d100: string;
      d200: string;
      d300: string;
      d400: string;
    };
    secondary: {
      l400: string;
      l300: string;
      l200: string;
      l100: string;
      /** background */
      base: string;
      d100: string;
      d200: string;
      d300: string;
      d400: string;
    };
    info: {
      l400: string;
      l300: string;
      l200: string;
      l100: string;
      base: string;
      d100: string;
      d200: string;
      d300: string;
      d400: string;
    };
    warning: {
      l400: string;
      l300: string;
      l200: string;
      l100: string;
      base: string;
      d100: string;
      d200: string;
      d300: string;
      d400: string;
    };
    destructive: {
      l400: string;
      l300: string;
      l200: string;
      l100: string;
      base: string;
      d100: string;
      d200: string;
      d300: string;
      d400: string;
    };
    productive: {
      l400: string;
      l300: string;
      l200: string;
      l100: string;
      base: string;
      d100: string;
      d200: string;
      d300: string;
      d400: string;
    };
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
