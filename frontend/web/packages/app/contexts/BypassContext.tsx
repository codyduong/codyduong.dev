import { createContext, useContext, useState } from 'react';

type BypassType = {
  mainContent?: React.RefObject<HTMLDivElement> | null;
  setMainContent: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLDivElement> | null>
  >;
};

const defaultValue = {
  setMainContent: () => {},
};

const BypassContext = createContext<BypassType>(defaultValue);

export const BypassProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [mainContent, setMainContent] =
    useState<React.RefObject<HTMLDivElement> | null>(null);

  return (
    <BypassContext.Provider
      value={{ ...defaultValue, mainContent, setMainContent }}
    >
      {children}
    </BypassContext.Provider>
  );
};

export const BypassConsumer = BypassContext.Consumer;

// eslint-disable-next-line react-refresh/only-export-components
export const useBypass = (): BypassType => {
  const bypass = useContext(BypassContext);

  return bypass;
};
