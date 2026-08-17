/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import React, { createContext, useContext, useMemo, useReducer } from 'react';

export type HeadValue = {
  title: string;
  description: string;
  favicon: string;
  status: number | undefined;
  redirect: string;
};

export type HeadCallbacks = {
  [K in keyof HeadValue as `update${Capitalize<K>}`]: (k: HeadValue[K]) => void;
};

const defaultValue = {
  title: '',
  updateTitle: () => {},
  description: '',
  updateDescription: () => {},
  favicon: '',
  updateFavicon: () => {},
  status: 200,
  updateStatus: () => {},
  redirect: '/',
  updateRedirect: () => {},
} as const satisfies HeadValue & HeadCallbacks;

type HeadActionO = {
  [K in keyof HeadValue as HeadValue[K] extends Function ? never : K]: {
    key: K;
    value: HeadValue[K];
  };
};
type HeadAction = HeadActionO[keyof HeadActionO];

const headReducer = (prevState: HeadValue, action: HeadAction): HeadValue => {
  return Object.assign({}, prevState, { [action.key]: action.value });
};

// type HeadCallbacks = { [K in keyof HeadValue as HeadValue[K] extends Function ? K : never]: HeadValue[K] };

const HeadContext = createContext<HeadValue & HeadCallbacks>(defaultValue);

const VALUES_LIST = ['title', 'description', 'favicon', 'status', 'redirect'] as const;

export const HeadProvider = ({
  children,
  value = defaultValue,
}: {
  children: React.ReactNode;
  value: (HeadValue & Partial<HeadCallbacks>) | undefined;
}): React.JSX.Element => {
  const [headValue, setHeadValue] = useReducer(headReducer, value);

  const callbacks = useMemo(
    () =>
      Object.fromEntries(
        VALUES_LIST.map(
          (k) =>
            [
              `update${k.slice(0, 1).toUpperCase()}${k.slice(1)}`,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (v: any) => setHeadValue({ key: 'title', value: v }),
            ] as const,
        ),
      ) as HeadCallbacks,
    [],
  );

  const joinedValue = useMemo(
    () => ({
      ...callbacks,
      ...headValue,
    }),
    [headValue, callbacks],
  );

  return <HeadContext value={joinedValue}>{children}</HeadContext>;
};

export const HeadConsumer = HeadContext.Consumer;

// eslint-disable-next-line react-refresh/only-export-components
export const useHead = (): HeadValue & HeadCallbacks => {
  const head = useContext(HeadContext);

  return head;
};
