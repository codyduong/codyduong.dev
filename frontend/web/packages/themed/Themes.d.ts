import React from 'react';
import { CSSProperties, DefaultTheme } from 'styled-components';

export type ColorValue = NonNullable<CSSProperties['color']>;

declare module 'styled-components' {
  export interface DefaultTheme {
    readonly color: {
      readonly text: {
        readonly 100: string;
        readonly 200: string;
        readonly 300: string;
        readonly 400: string;
        readonly 500: string;
        readonly 600: string;
      };
      readonly surface: {
        readonly 100: string;
        readonly 200: string;
        readonly 300: string;
        readonly 350: string;
        readonly 400: string;
        readonly 500: string;
      };
      readonly base: {
        readonly 50: string;
        readonly 100: string;
        readonly 200: string;
        readonly 300: string;
        readonly 400: string;
        readonly 500: string;
      };
      readonly bottom: {
        readonly 100: string;
        readonly 200: string;
        readonly 300: string;
        readonly 400: string;
        readonly 500: string;
      };
      readonly info: {
        readonly 100: string;
        readonly 200: string;
        readonly 300: string;
        readonly 400: string;
        readonly 500: string;
      };
      readonly warning: {
        readonly 100: string;
        readonly 200: string;
        readonly 300: string;
        readonly 400: string;
        readonly 500: string;
      };
      readonly destructive: {
        readonly 100: string;
        readonly 200: string;
        readonly 300: string;
        readonly 400: string;
        readonly 500: string;
      };
      readonly productive: {
        readonly 100: string;
        readonly 200: string;
        readonly 300: string;
        readonly 400: string;
        readonly 500: string;
      };
    };
    readonly spacing: {
      readonly rem: ((n: number) => `${number}rem`) & {
        readonly 12.5: `${number}rem`;
        readonly 25: `${number}rem`;
        readonly 50: `${number}rem`;
        readonly 75: `${number}rem`;
        readonly 87.5: `${number}rem`;
        readonly 100: `${number}rem`;
        readonly 125: `${number}rem`;
        readonly 150: `${number}rem`;
        readonly 200: `${number}rem`;
        readonly 250: `${number}rem`;
        readonly 300: `${number}rem`;
        readonly 350: `${number}rem`;
        readonly 400: `${number}rem`;
        readonly 450: `${number}rem`;
        readonly 500: `${number}rem`;
        readonly 800: `${number}rem`;
        readonly 1000: `${number}rem`;
      };
      readonly px: ((n: number) => `${number}px`) & {
        readonly 12.5: `${number}px`;
        readonly 25: `${number}px`;
        readonly 50: `${number}px`;
        readonly 75: `${number}px`;
        readonly 87.5: `${number}px`;
        readonly 100: `${number}px`;
        readonly 125: `${number}px`;
        readonly 150: `${number}px`;
        readonly 200: `${number}px`;
        readonly 250: `${number}px`;
        readonly 300: `${number}px`;
        readonly 350: `${number}px`;
        readonly 400: `${number}px`;
        readonly 450: `${number}px`;
        readonly 500: `${number}px`;
        readonly 800: `${number}px`;
        readonly 1000: `${number}px`;
      };
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

declare module '@storybook/addon-docs' {
  export const ColorPalette: React.FC<{ children: React.ReactNode }>;
}
