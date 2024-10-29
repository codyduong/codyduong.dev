import React, { createContext, useContext, useState } from 'react';

type ScrollType = {
  pageRef: React.RefObject<HTMLDivElement> | null;
  setPageRef: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLDivElement> | null>
  >;
  top: number;
  setTop: React.Dispatch<React.SetStateAction<number>>;
  scrollHeight: number;
  setScrollHeight: React.Dispatch<React.SetStateAction<number>>;
  pageDirection: 'up' | 'down' | undefined;
  setPageDirection: React.Dispatch<
    React.SetStateAction<'up' | 'down' | undefined>
  >;
};

const defaultValue: ScrollType = {
  pageRef: null,
  setPageRef: () => {},
  top: 0,
  setTop: () => {},
  scrollHeight: 0,
  setScrollHeight: () => {},
  pageDirection: undefined,
  setPageDirection: () => {},
};

const ScrollContext = createContext<ScrollType>(defaultValue);

export const ScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [top, setTop] = useState(defaultValue.top);
  const [scrollHeight, setScrollHeight] = useState(defaultValue.scrollHeight);
  const [pageDirection, setPageDirection] = useState(
    defaultValue.pageDirection,
  );
  const [pageRef, setPageRef] =
    useState<React.RefObject<HTMLDivElement> | null>(null);

  return (
    <ScrollContext.Provider
      value={{
        ...defaultValue,
        pageRef,
        setPageRef,
        top,
        setTop,
        scrollHeight,
        setScrollHeight,
        pageDirection,
        setPageDirection,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const ScrollConsumer = ScrollContext.Consumer;

// eslint-disable-next-line react-refresh/only-export-components
export const useScroll = (): ScrollType => {
  const scroll = useContext(ScrollContext);

  return scroll;
};
