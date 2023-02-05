import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';

export type AccessibilityType = {
  paragraphWidth: number | undefined;
  setParagraphWidth: React.Dispatch<React.SetStateAction<number | undefined>>;
  disableInteractionAnimations: boolean | undefined;
  setDisableInteractionAnimations: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;

  prefersReducedMotion: boolean;
};

/* eslint-disable @typescript-eslint/no-empty-function, no-empty-function */
const defaultValue = {
  paragraphWidth: undefined,
  setParagraphWidth: () => {},
  disableInteractionAnimations: false,
  setDisableInteractionAnimations: () => {},

  prefersReducedMotion: true,
} as const;
/* eslint-enable @typescript-eslint/no-empty-function, no-empty-function */

const AccessibilityContext = createContext<AccessibilityType>(defaultValue);

export const AccessibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [cookies, setCookies] = useCookies(['accessibility']);

  const [cookiesWrapper, setCookiesWrapper] = useState(cookies);

  const setCookiesHandler: typeof setCookies = (...args) => {
    setCookies(...args);
    setCookiesWrapper({ ...cookiesWrapper, [args[0]]: args[1] });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const accessibility = () => {
    return cookies['accessibility'] ?? {};
  };
  const [paragraphWidth, setParagraphWidthState] = useState(() => {
    const parsedInt = parseInt(accessibility()[0]);
    return Number.isNaN(parsedInt) ? undefined : parsedInt;
  });
  const setParagraphWidth: AccessibilityType['setParagraphWidth'] = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(paragraphWidth) : value;
      setParagraphWidthState(valueToStore);
      setCookiesHandler(
        'accessibility',
        {
          ...(accessibility() ?? {}),
          0: valueToStore === undefined ? null : valueToStore,
        },
        {
          sameSite: 'strict',
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true
      : false;
  const [disableInteractionAnimations, setDisableInteractionAnimationsState] =
    useState<boolean | undefined>(() => {
      return accessibility()[1] === null
        ? prefersReducedMotion
        : accessibility()[1] === 1;
    });
  const setDisableInteractionAnimations: AccessibilityType['setDisableInteractionAnimations'] =
    (value) => {
      try {
        const valueToStore =
          value instanceof Function
            ? value(disableInteractionAnimations)
            : value === prefersReducedMotion
            ? undefined
            : value;
        setDisableInteractionAnimationsState(valueToStore);
        setCookiesHandler(
          'accessibility',
          {
            ...(accessibility() ?? {}),
            1: valueToStore === undefined ? null : valueToStore ? 1 : 0,
          },
          {
            sameSite: 'strict',
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <AccessibilityContext.Provider
      value={{
        ...defaultValue,
        paragraphWidth,
        setParagraphWidth,
        disableInteractionAnimations,
        setDisableInteractionAnimations,
        prefersReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const AccessibilityConsumer = AccessibilityContext.Consumer;

export const useAccessibility = (): AccessibilityType => {
  const accessibility = useContext(AccessibilityContext);

  return accessibility;
};
