/**
The MIT License (MIT)

Copyright (c) 2019 Jose Bateira <jlageb@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */

// originally at: https://github.com/zebateira/react-use-system-theme
// modified to use (add|remove)EventListener instead

import { useState, useEffect, useLayoutEffect } from 'react';

export type SystemTheme = 'system' | 'dark' | 'light';

const useLayoutEffectIsomorphic = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const colorSchemes = {
  light: '(prefers-color-scheme: light)',
  dark: '(prefers-color-scheme: dark)',
};

function onThemeChange(callback: () => void) {
  return (event: MediaQueryListEvent) => {
    if (!event || !event.matches) {
      return;
    }

    callback();
  };
}

export default function useSystemTheme(fallback: 'dark' | 'light'): SystemTheme {
  const [theme, setTheme] = useState(fallback);

  useEffect(() => {
    // SSR or matchMedia not supported
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const lightMatch = window.matchMedia(colorSchemes.light);
    const onLightMatches = onThemeChange(() => setTheme('light'));

    lightMatch.addEventListener('change', onLightMatches);

    const darkMatch = window.matchMedia(colorSchemes.dark);
    const onDarkMatches = onThemeChange(() => setTheme('dark'));

    darkMatch.addEventListener('change', onDarkMatches);

    return () => {
      lightMatch.removeEventListener('change', onLightMatches);
      darkMatch.removeEventListener('change', onDarkMatches);
    };
  }, []);

  useLayoutEffectIsomorphic(() => {
    // SSR or matchMedia not supported
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    if (window.matchMedia(colorSchemes.dark).matches && theme !== 'dark') {
      setTheme('dark');
    } else if (window.matchMedia(colorSchemes.light).matches && theme !== 'light') {
      setTheme('light');
    }
  }, [theme]);

  return theme;
}
