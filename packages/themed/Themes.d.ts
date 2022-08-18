import { CSSProperties, DefaultTheme } from 'styled-components';

export type ColorValue = NonNullable<CSSProperties['color']>;

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      text: {
        100: '#ffffff';
        200: '#bababa';
        300: '#808080';
        400: '#404040';
        500: '#1b1b1b';
        600: '#0a0a0a';
      };
      surface: {
        100: '#ffffff';
        200: '#cecece';
        300: '#b0b0b0';
        400: '#252525';
        500: '#050505';
      };
      surface: {
        100: '';
        200: '';
        300: '';
        400: '';
        500: '';
      };
      base: {
        100: '';
        200: '';
        300: '';
        400: '';
        500: '';
      };
      bottom: {
        100: '';
        200: '';
        300: '';
        400: '';
        500: '';
      };
      info: {
        l400: '';
        l300: '';
        l200: '';
        l100: '';
        base: '';
        d100: '';
        d200: '';
        d300: '';
        d400: '';
      };
      warning: {
        l400: '';
        l300: '';
        l200: '';
        l100: '';
        base: '';
        d100: '';
        d200: '';
        d300: '';
        d400: '';
      };
      destructive: {
        l400: '';
        l300: '';
        l200: '';
        l100: '';
        base: '';
        d100: '';
        d200: '';
        d300: '';
        d400: '';
      };
      productive: {
        l400: '#a3eea9';
        l300: '#7ad882';
        l200: '#57cc61';
        l100: '#40be4b';
        base: '#30ad3a';
        d100: '#25a130';
        d200: '#1c9426';
        d300: '#0c5e13';
        d400: '#06470c';
      };
    };
    spacing: {
      rem: {
        100: '0.5rem';
        200: '1rem';
        300: '1.5rem';
        400: '2rem';
        500: '2.5rem';
        600: '3rem';
        700: '3.5rem';
        800: '4rem';
      };
    };

    /** @deprecated */
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
    /** @deprecated */
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
    /** @deprecated */
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
    /** @deprecated */
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
    /** @deprecated */
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
    /** @deprecated */
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
    /** @deprecated */
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
