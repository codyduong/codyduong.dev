import { useLocalStorage } from 'packages/context/LocalStorageContext';
import { createContext, useContext, useEffect, useState } from 'react';

export type AccessibilityType = {
  paragraphWidth: number | undefined;
  setParagraphWidth: React.Dispatch<React.SetStateAction<number | undefined>>;
  disableInteractionAnimations: boolean;
  setDisableInteractionAnimations: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

/* eslint-disable @typescript-eslint/no-empty-function, no-empty-function */
const defaultValue = {
  paragraphWidth: undefined,
  setParagraphWidth: () => {},
  disableInteractionAnimations: false,
  setDisableInteractionAnimations: () => {},
} as const;
/* eslint-enable @typescript-eslint/no-empty-function, no-empty-function */

const AccessibilityContext = createContext<AccessibilityType>(defaultValue);

export const AccessibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const LocalStorage = useLocalStorage();
  const [paragraphWidth, setParagraphWidth] = useState<number>();
  const [disableInteractionAnimations, setDisableInteractionAnimations] =
    useState(false);

  useEffect(() => {
    const paragraphWidthString = LocalStorage?.getItem('paragraphWidth');
    const disableInteractionAnimationsString = LocalStorage?.getItem(
      'disableInteractionAnimations'
    );
    setParagraphWidth(
      paragraphWidthString == undefined
        ? undefined
        : paragraphWidthString === ''
        ? undefined
        : Number(paragraphWidthString)
    );
    setDisableInteractionAnimations(
      disableInteractionAnimationsString === 'true' ||
        disableInteractionAnimationsString === 'false'
        ? disableInteractionAnimationsString === 'true'
        : typeof window !== 'undefined'
        ? window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true
        : false
    );
  }, [LocalStorage]);

  useEffect(() => {
    paragraphWidth == undefined
      ? LocalStorage?.removeItem('paragraphWidth')
      : LocalStorage?.setItem('paragraphWidth', `${paragraphWidth}`);
  }, [paragraphWidth]);

  useEffect(() => {
    LocalStorage?.setItem(
      'disableInteractionAnimations',
      `${disableInteractionAnimations}`
    );
  }, [disableInteractionAnimations]);

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
