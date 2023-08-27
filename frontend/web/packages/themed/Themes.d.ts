import React from 'react';
import { CSSProperties, DefaultTheme } from 'packages/styled-components';

export type ColorValue = NonNullable<CSSProperties['color']>;

declare module 'packages/styled-components' {
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
        /** @default 0.0125rem */
        readonly 12.5: `${number}rem`;
        /** @default 0.25rem */
        readonly 25: `${number}rem`;
        /** @default 0.5rem */
        readonly 50: `${number}rem`;
        /** @default 0.75rem */
        readonly 75: `${number}rem`;
        /** @default 0.875rem */
        readonly 87.5: `${number}rem`;
        /** @default 1rem */
        readonly 100: `${number}rem`;
        /** @default 1.25rem */
        readonly 125: `${number}rem`;
        /** @default 1.5rem */
        readonly 150: `${number}rem`;
        /** @default 2rem */
        readonly 200: `${number}rem`;
        /** @default 2.5rem */
        readonly 250: `${number}rem`;
        /** @default 3rem */
        readonly 300: `${number}rem`;
        /** @default 3.5rem */
        readonly 350: `${number}rem`;
        /** @default 4rem */
        readonly 400: `${number}rem`;
        /** @default 4.5rem */
        readonly 450: `${number}rem`;
        /** @default 5rem */
        readonly 500: `${number}rem`;
        /** @default 8rem */
        readonly 800: `${number}rem`;
        /** @default 10rem */
        readonly 1000: `${number}rem`;
      };
      readonly px: ((n: number) => `${number}px`) & {
        /** @default 2px */
        readonly 12.5: `${number}px`;
        /** @default 4px */
        readonly 25: `${number}px`;
        /** @default 8px */
        readonly 50: `${number}px`;
        /** @default 12px */
        readonly 75: `${number}px`;
        /** @default 14px */
        readonly 87.5: `${number}px`;
        /** @default 16px */
        readonly 100: `${number}px`;
        /** @default 20px */
        readonly 125: `${number}px`;
        /** @default 24px */
        readonly 150: `${number}px`;
        /** @default 32px */
        readonly 200: `${number}px`;
        /** @default 40px */
        readonly 250: `${number}px`;
        /** @default 48px */
        readonly 300: `${number}px`;
        /** @default 56px */
        readonly 350: `${number}px`;
        /** @default 64px */
        readonly 400: `${number}px`;
        /** @default 72px */
        readonly 450: `${number}px`;
        /** @default 80px */
        readonly 500: `${number}px`;
        /** @default 128px */
        readonly 800: `${number}px`;
        /** @default 160px */
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
