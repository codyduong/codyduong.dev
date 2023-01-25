import { createContext, useContext } from 'react';

type UrlSearchParamsType = InstanceType<typeof URLSearchParams>;

const defaultValue = new URLSearchParams('');

const UrlSearchParamsContext = createContext<UrlSearchParamsType>(defaultValue);

export const QueryProvider = ({
  children,
  query,
}: {
  children: React.ReactNode;
  query: UrlSearchParamsType;
}): JSX.Element => {
  return (
    <UrlSearchParamsContext.Provider value={query ?? defaultValue}>
      {children}
    </UrlSearchParamsContext.Provider>
  );
};

export const QueryConsumer = UrlSearchParamsContext.Consumer;

export const useUrlSearchParams = (): UrlSearchParamsType => {
  const query = useContext(UrlSearchParamsContext);

  return query;
};
