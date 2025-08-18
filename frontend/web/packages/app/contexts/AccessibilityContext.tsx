import { SystemTheme } from 'packages/hooks/useSystemTheme';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

type Cookies = {
  accessibility: MinimizedAccessibilityCookie | undefined;
};

const AccessibilityCookieKeys = ['paragraphWidth', 'prefersReducedMotion'] as const;
const AccessibilityCookieValueTypes = ['number', 'boolean'] as const;

type Assert<T, U> =
  (<V>() => V extends T ? 1 : 2) extends <V>() => V extends U ? 1 : 2
    ? true
    : { error: 'Types are not equal'; type1: T; type2: U };

type AccessibilityCookie = {
  paragraphWidth?: number | null;
  prefersReducedMotion?: boolean | null;
};

const _0: Assert<keyof AccessibilityCookie, (typeof AccessibilityCookieKeys)[number]> = true;

// The type to convert a value to its minimized string representation
type MinimizedValue<T> = T extends undefined | null
  ? ''
  : T extends boolean
    ? 0 | 1 // Check for boolean first to preserve 0/1 literals
    : T extends number
      ? number
      : T;

// The recursive type to join the key-value pairs
type Join<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
  K extends readonly (keyof T)[],
> = K extends readonly [infer Head, ...infer Tail]
  ? Head extends keyof T
    ? Tail extends readonly (keyof T)[]
      ? `${MinimizedValue<T[Head]>};${Join<T, Tail>}`
      : `${MinimizedValue<T[Head]>}`
    : never
  : '';

// The final minimized type
type MinimizedAccessibilityCookie = Join<AccessibilityCookie, typeof AccessibilityCookieKeys>;

export type AccessibilityType = {
  // visual
  theme: SystemTheme;
  paragraphWidth: number | undefined;
  setParagraphWidth: React.Dispatch<React.SetStateAction<number | undefined>>;
  disableInteractionAnimations: boolean | undefined;
  setDisableInteractionAnimations: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

const defaultValue = {
  theme: 'system',
  paragraphWidth: undefined,
  setParagraphWidth: () => {},
  disableInteractionAnimations: false,
  setDisableInteractionAnimations: () => {},

  prefersReducedMotion: true,
} as const;

const AccessibilityContext = createContext<AccessibilityType>(defaultValue);

const getAcTruncated = (originalAndMore: AccessibilityCookie | undefined): AccessibilityCookie => ({
  paragraphWidth: originalAndMore?.paragraphWidth ?? null,
  prefersReducedMotion: originalAndMore?.prefersReducedMotion ?? null,
});

const minimizeValue = (v: unknown) => {
  if (typeof v === 'boolean') {
    return v ? '1' : '0';
  }
  return v;
};

const minimizeAccessibilityCookie = (acCookie: AccessibilityCookie) => {
  return Object.values(acCookie).map(minimizeValue).join(';');
};

const expandValue = (v: string, t: 'number' | 'boolean') => {
  if (t === 'number') {
    return Number(v);
  }
  if (t === 'boolean') {
    if (v === '0') {
      return false;
    }
    if (v === '1') {
      return true;
    }
  }
  return null;
};

const expandAccessibilityCookie = (minCookie: MinimizedAccessibilityCookie | undefined): AccessibilityCookie => {
  try {
    if (minCookie === undefined) {
      return Object.fromEntries(AccessibilityCookieKeys.map((k) => [k, null])) as AccessibilityCookie;
    }

    const splits = minCookie.split(';');
    return Object.fromEntries(
      splits
        .map((v, i) =>
          AccessibilityCookieKeys[i]
            ? [AccessibilityCookieKeys[i], expandValue(v ?? '', AccessibilityCookieValueTypes[i])]
            : undefined,
        )
        .filter((kv) => kv !== undefined),
    );
  } catch (e) {
    console.warn(e);
    return Object.fromEntries(AccessibilityCookieKeys.map((k) => [k, null])) as AccessibilityCookie;
  }
};

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [cookies, setCookies] = useCookies<keyof Cookies, Cookies>(['accessibility']);
  const acCookie = getAcTruncated(expandAccessibilityCookie(cookies.accessibility));

  const setAcCookieKV = useCallback(
    <K extends keyof AccessibilityCookie>(k: K, v: AccessibilityCookie[K]) => {
      setCookies('accessibility', minimizeAccessibilityCookie({ ...acCookie, [k]: v }), {
        sameSite: 'strict',
      });
    },
    [acCookie, setCookies],
  );

  const [paragraphWidth, setParagraphWidthState] = useState(() => {
    const parsedInt = parseInt(`${acCookie?.['paragraphWidth']}`);
    return Number.isNaN(parsedInt) ? undefined : parsedInt;
  });
  const setParagraphWidth: AccessibilityType['setParagraphWidth'] = (value) => {
    const valueToStore = value instanceof Function ? value(paragraphWidth) : value;
    setParagraphWidthState(valueToStore);
    setAcCookieKV('paragraphWidth', valueToStore ?? null);
  };

  const getPrefersReducedMotion = () =>
    typeof window !== 'undefined' ? window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true : false;
  const [disableInteractionAnimations, setDisableInteractionAnimationsState] = useState<boolean | undefined>(() => {
    return acCookie?.prefersReducedMotion ?? getPrefersReducedMotion();
  });

  const setDisableInteractionAnimations: AccessibilityType['setDisableInteractionAnimations'] = (value) => {
    const valueToStore =
      value instanceof Function
        ? value(disableInteractionAnimations)
        : value === getPrefersReducedMotion()
          ? undefined
          : value;
    setDisableInteractionAnimationsState(valueToStore ?? getPrefersReducedMotion());
    setAcCookieKV('prefersReducedMotion', valueToStore ?? null);
  };

  useEffect(() => {
    setParagraphWidthState(acCookie?.paragraphWidth ?? undefined);
    setDisableInteractionAnimationsState(acCookie?.prefersReducedMotion ?? undefined);
  }, [acCookie]);

  return (
    <AccessibilityContext
      value={{
        ...defaultValue,
        paragraphWidth,
        setParagraphWidth,
        disableInteractionAnimations,
        setDisableInteractionAnimations,
      }}
    >
      {children}
    </AccessibilityContext>
  );
};

export const AccessibilityConsumer = AccessibilityContext.Consumer;

// eslint-disable-next-line react-refresh/only-export-components
export const useAccessibility = (): AccessibilityType => {
  const accessibility = useContext(AccessibilityContext);

  return accessibility;
};
