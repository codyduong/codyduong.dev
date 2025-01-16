import React, { useState } from 'react';
import type { Theme } from './Theme';
import * as DEFAULT from './default';

export const themes = {
  ...DEFAULT,
} as const;

export function useThemeBase(): [Theme, React.Dispatch<React.SetStateAction<Theme>>] {
  const [theme, setTheme] = useState<Theme>(themes.DEFAULT);

  const setThemeOverride = (value: Theme | ((value: Theme) => Theme)): void => {
    setTheme(value);
  };

  return [theme, setThemeOverride];
}
