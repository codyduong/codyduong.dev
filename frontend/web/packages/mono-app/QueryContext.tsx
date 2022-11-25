import { createContext, useContext, useEffect, useState } from 'react';

type QueryType = Record<string, any>;

const defaultValue = {};

const QueryContext = createContext<QueryType>(defaultValue);

export const QueryProvider = ({
  children,
  query,
}: {
  children: React.ReactNode;
  query: QueryType;
}): JSX.Element => {
  console.log(query);

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
