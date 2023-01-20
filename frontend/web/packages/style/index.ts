import { useAccessibility } from 'packages/mono-app/AccessibilityContext';
import { css } from 'styled-components';

export { default as breakpoints } from './breakpoints';
export const commoncss = {
  focus: css`
    :focus {
      outline: ${({ theme }) => theme.color.base[300]} 2px solid;
    }
    @supports selector(:focus-visible) {
      &:focus {
        outline: none;
      }
      &:focus-visible {
        outline: ${({ theme }) => theme.color.base[300]} 2px solid;
      }
    }
  `,
  wcagWidthLimited: css`
    ${() => {
      const { paragraphWidth } = useAccessibility();
      if (paragraphWidth) {
        return css`
          max-width: ${paragraphWidth}ch;
        `;
      }
    }}
  `,
};
