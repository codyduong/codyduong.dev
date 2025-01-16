import { useAccessibility, AccessibilityType } from 'packages/app/contexts/AccessibilityContext';
import { css, RuleSet } from 'styled-components';

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
  widthlimitedflat: css`
    ${() => {
      const { paragraphWidth } = useAccessibility();
      if (paragraphWidth) {
        return css`
          max-width: ${paragraphWidth}ch;
        `;
      }
    }}
  `,
  widthlimited: <
    T extends undefined | string | RuleSet<object>,
    U extends undefined | string | RuleSet<object>,
  >(opts?: {
    enabled?: T | ((paragraphWidth: AccessibilityType['paragraphWidth']) => T);
    disabled?: U | ((paragraphWidth: AccessibilityType['paragraphWidth']) => U);
  }): RuleSet<object> | undefined => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { paragraphWidth } = useAccessibility();
    if (paragraphWidth) {
      return typeof opts?.enabled === 'function'
        ? css`
            ${opts?.enabled(paragraphWidth)}
          `
        : css`
            max-width: ${paragraphWidth}ch;
            ${opts?.enabled ?? ''}
          `;
    } else {
      return typeof opts?.disabled === 'function'
        ? css`
            ${opts?.disabled(paragraphWidth)}
          `
        : css`
            ${opts?.disabled ?? ''}
          `;
    }
  },
  animation: <T extends undefined | string | RuleSet<object>, U extends undefined | string | RuleSet<object>>(opts: {
    enabled?: T;
    disabled?: U;
  }): T | U | undefined => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { disableInteractionAnimations } = useAccessibility();
    if (disableInteractionAnimations === true) {
      return opts.disabled;
    } else {
      return opts.enabled;
    }
  },
};
