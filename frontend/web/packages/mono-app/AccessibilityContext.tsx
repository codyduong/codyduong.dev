import { createContext, useContext, useEffect, useState } from 'react';

export type AccessibilityType = {
  paragraphWidth?: number | undefined;
  setParagraphWidth: React.Dispatch<React.SetStateAction<number | undefined>>;
  disableInteractionAnimations: boolean;
  setDisableInteractionAnimations: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

/* eslint-disable @typescript-eslint/no-empty-function, no-empty-function */
const defaultValue = {
  setParagraphWidth: () => {},
  disableInteractionAnimations: false,
  setDisableInteractionAnimations: () => {},
};
/* eslint-enable @typescript-eslint/no-empty-function, no-empty-function */

const AccessibilityContext = createContext<AccessibilityType>(defaultValue);

export const AccessibilityProvider = ({
  value,
  children,
}: {
  value?: Partial<
    Pick<AccessibilityType, 'paragraphWidth' | 'disableInteractionAnimations'>
  >;
  children: React.ReactNode;
}): JSX.Element => {
  const [paragraphWidth, setParagraphWidth] = useState<number | undefined>(
    value?.paragraphWidth
  );
  const [disableInteractionAnimations, setDisableInteractionAnimations] =
    useState(
      value?.disableInteractionAnimations ?? typeof window !== 'undefined'
        ? window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true
        : false
    );

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setDisableInteractionAnimations(
  //       window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true
  //     );
  //   }
  // }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        ...defaultValue,
        paragraphWidth,
        setParagraphWidth,
        disableInteractionAnimations,
        setDisableInteractionAnimations,
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
