import { createContext, useContext } from 'react';

type QueryType = InstanceType<typeof URLSearchParams>;

const defaultValue = new URLSearchParams('');

const QueryContext = createContext<QueryType>(defaultValue);

export const QueryProvider = ({
  children,
  query,
}: {
  children: React.ReactNode;
  query: QueryType;
}): JSX.Element => {
  return (
    <QueryContext.Provider value={query ?? defaultValue}>
      {children}
    </QueryContext.Provider>
  );
};

export const QueryConsumer = QueryContext.Consumer;

export const useQuery = (): QueryType => {
  const query = useContext(QueryContext);

  return query;
};
