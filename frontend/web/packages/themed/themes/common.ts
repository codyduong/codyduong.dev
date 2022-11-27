function remFunction(n: number): `${number}rem` {
  return `${n / 100}rem`;
}

function pxFunction(n: number): `${number}px` {
  return `${(n / 100) * 16}px`;
}

export const COMMON_THEME = {
  spacing: {
    rem: Object.assign(remFunction, {
      12.5: '0.0125rem',
      25: '0.25rem',
      50: '0.5rem',
      75: '0.75rem',
      87.5: '0.875rem',
      100: '1rem',
      125: '1.25rem',
      150: '1.5rem',
      200: '2rem',
      250: '2.5rem',
      300: '3rem',
      350: '3.5rem',
      400: '4rem',
      450: '4.5rem',
      500: '5rem',
      800: '8rem',
      1000: '10rem',
    } as const),
    px: Object.assign(pxFunction, {
      12.5: '2px',
      25: '4px',
      50: '8px',
      75: '12px',
      87.5: '14px',
      100: '16px',
      125: '20px',
      150: '24px',
      200: '32px',
      250: '40px',
      300: '48px',
      350: '56px',
      400: '64px',
      450: '72px',
      500: '80px',
      800: '128px',
      1000: '160px',
    } as const),
  },
} as const;
