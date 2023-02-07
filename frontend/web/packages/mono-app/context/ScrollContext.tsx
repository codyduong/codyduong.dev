import React, { createContext, useContext, useState } from 'react';

type ScrollType = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageDirection: 'up' | 'down' | undefined;
  setPageDirection: React.Dispatch<
    React.SetStateAction<'up' | 'down' | undefined>
  >;
};

/* eslint-disable no-empty-function, @typescript-eslint/no-empty-function */
const defaultValue: ScrollType = {
  page: 0,
  setPage: () => {},
  pageDirection: undefined,
  setPageDirection: () => {},
};
/* eslint-enable no-empty-function, @typescript-eslint/no-empty-function */

const ScrollContext = createContext<ScrollType>(defaultValue);

export const ScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [page, setPage] = useState(defaultValue.page);
  const [pageDirection, setPageDirection] = useState(
    defaultValue.pageDirection
  );

  return (
    <ScrollContext.Provider
      value={{
        ...defaultValue,
        page,
        setPage,
        pageDirection,
        setPageDirection,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const ScrollConsumer = ScrollContext.Consumer;

export const useScroll = (): ScrollType => {
  const scroll = useContext(ScrollContext);

  return scroll;
};
