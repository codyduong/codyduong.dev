import { createContext, useContext, useState } from 'react';

type BypassType = {
  mainContent?: React.RefObject<HTMLDivElement> | null;
  setMainContent: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLDivElement> | null>
  >;
};

const defaultValue = {
  // eslint-disable-next-line no-empty-function
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

export const useBypass = (): BypassType => {
  const bypass = useContext(BypassContext);

  return bypass;
};
