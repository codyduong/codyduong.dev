import React, { createContext, useCallback, useContext, useState } from 'react';

export type HeadValue = {
  title: string;
  updateTitle: (title: string) => void;
  description: string;
  updateDescription: (description: string) => void;
};

const defaultValue = {
  title: '',
  updateTitle: () => {},
  description: '',
  updateDescription: () => {},
} as const satisfies HeadValue;

const HeadContext = createContext<HeadValue>(defaultValue);

export const HeadProvider = ({
  children,
  value = defaultValue,
}: {
  children: React.ReactNode;
  value: HeadValue | undefined;
}): JSX.Element => {
  const [t, setT] = useState(value.title);
  const [d, setD] = useState(value.description);

  const updateTitle = useCallback(
    (title: string) => {
      value.updateTitle(title);
      setT(title);
    },
    [value],
  );

  const updateDescription = useCallback(
    (description: string) => {
      value.updateDescription(description);
      setD(description);
    },
    [value],
  );

  return (
    <HeadContext.Provider
      value={{
        title: t,
        updateTitle,
        description: d,
        updateDescription,
      }}
    >
      {children}
    </HeadContext.Provider>
  );
};

export const HeadConsumer = HeadContext.Consumer;

// eslint-disable-next-line react-refresh/only-export-components
export const useHead = (): HeadValue => {
  const head = useContext(HeadContext);

  return head;
};
