import React, { createContext, useCallback, useContext, useState } from 'react';

export type HeadValue = {
  title: string;
  updateTitle: (title: string) => void;
  description: string;
  updateDescription: (description: string) => void;
  favicon: string;
  updateFavicon: (favicon: string) => void;
};

const defaultValue = {
  title: '',
  updateTitle: () => {},
  description: '',
  updateDescription: () => {},
  favicon: '',
  updateFavicon: () => {},
} as const satisfies HeadValue;

const HeadContext = createContext<HeadValue>(defaultValue);

export const HeadProvider = ({
  children,
  value = defaultValue,
}: {
  children: React.ReactNode;
  value: HeadValue | undefined;
}): React.JSX.Element => {
  const [t, setT] = useState(value.title);
  const [d, setD] = useState(value.description);
  const [f, setF] = useState(value.favicon);

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

  const updateFavicon = useCallback(
    (favicon: string) => {
      value.updateFavicon(favicon);
      setF(favicon);
    },
    [value],
  );

  return (
    <HeadContext
      value={{
        title: t,
        updateTitle,
        description: d,
        updateDescription,
        favicon: f,
        updateFavicon,
      }}
    >
      {children}
    </HeadContext>
  );
};

export const HeadConsumer = HeadContext.Consumer;

// eslint-disable-next-line react-refresh/only-export-components
export const useHead = (): HeadValue => {
  const head = useContext(HeadContext);

  return head;
};
