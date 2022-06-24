import React, { useState } from 'react';
import type { Theme } from './Themes';
import themes from './themes';

export function useThemeBase(): [
  Theme,
  React.Dispatch<React.SetStateAction<Theme>>
] {
  const [theme, setTheme] = useState<Theme>(themes.SOLARIZED_DARK);

  const setThemeOverride = (value: Theme | ((value: Theme) => Theme)): void => {
    setTheme(value);
  };

  return [theme, setThemeOverride];
}
