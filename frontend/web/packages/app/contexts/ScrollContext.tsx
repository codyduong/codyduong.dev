import React, { createContext, useContext, useRef, useState } from 'react';

type ScrollType = {
  top: number;
  setTop: React.Dispatch<React.SetStateAction<number>>;
  scrollHeight: number;
  setScrollHeight: React.Dispatch<React.SetStateAction<number>>;
  pageDirection: 'up' | 'down' | undefined;
  setPageDirection: React.Dispatch<React.SetStateAction<'up' | 'down' | undefined>>;
  pageRef: React.RefObject<HTMLDivElement | null> | null;
};

const defaultValue: ScrollType = {
  top: 0,
  setTop: () => {},
  scrollHeight: 0,
  setScrollHeight: () => {},
  pageDirection: undefined,
  setPageDirection: () => {},
  pageRef: null,
};

const ScrollContext = createContext<ScrollType>(defaultValue);

export const ScrollProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [top, setTop] = useState(defaultValue.top);
  const [scrollHeight, setScrollHeight] = useState(defaultValue.scrollHeight);
  const [pageDirection, setPageDirection] = useState(defaultValue.pageDirection);
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollContext
      value={{
        ...defaultValue,
        top,
        setTop,
        scrollHeight,
        setScrollHeight,
        pageDirection,
        setPageDirection,
        pageRef,
      }}
    >
      {children}
    </ScrollContext>
  );
};

export const ScrollConsumer = ScrollContext.Consumer;

// eslint-disable-next-line react-refresh/only-export-components
export const useScroll = (): ScrollType => {
  const scroll = useContext(ScrollContext);

  return scroll;
};
