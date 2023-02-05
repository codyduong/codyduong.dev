import { createContext, useContext, useState } from 'react';

type TitleType = {
  prefixOverride?: string | null;
  setPrefixOverride: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
};

const defaultValue = {
  prefixOverride: '',
  // eslint-disable-next-line no-empty-function
  setPrefixOverride: () => {},
};

const TitleContext = createContext<TitleType>(defaultValue);

export const TitleProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [prefixOverride, setPrefixOverride] = useState<
    string | null | undefined
  >(null);

  return (
    <TitleContext.Provider
      value={{ ...defaultValue, prefixOverride, setPrefixOverride }}
    >
      {children}
    </TitleContext.Provider>
  );
};

export const TitleConsumer = TitleContext.Consumer;

export const useTitle = (): TitleType => {
  const title = useContext(TitleContext);

  return title;
};
