import { createContext, useContext, useState } from 'react';

type AccessibilityType = {
  paragraphWidth?: number | undefined;
  setParagraphWidth: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const defaultValue = {
  // eslint-disable-next-line no-empty-function
  setParagraphWidth: () => {},
};

const AccessibilityContext = createContext<AccessibilityType>(defaultValue);

export const AccessibilityProvider = ({
  value,
  children,
}: {
  value?: Pick<AccessibilityType, 'paragraphWidth'>;
  children: React.ReactNode;
}): JSX.Element => {
  const [paragraphWidth, setParagraphWidth] = useState<number | undefined>(
    value?.paragraphWidth
  );

  return (
    <AccessibilityContext.Provider
      value={{ ...defaultValue, paragraphWidth, setParagraphWidth }}
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
