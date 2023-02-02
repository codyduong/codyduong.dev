import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

type LocalStorageKeyValues = {
  token: `Bearer ${string}`;
  paragraphWidth: `${number}`;
  disableInteractionAnimations: `${boolean}`;
};

export type LocalStorageState = {
  [K in keyof LocalStorageKeyValues]: LocalStorageKeyValues[K] | null;
};

// const LocalStorageStateDefault: LocalStorageState = {
//   token: null,
//   paragraphWidth: null,
//   disableInteractionAnimations: null,
// };

export type LocalStorage = Omit<
  Storage,
  'getItem' | 'removeItem' | 'setItem'
> & {
  getItem: (key: keyof LocalStorageKeyValues) => string | null;
  removeItem: (key: keyof LocalStorageKeyValues) => void;
  setItem: <K extends keyof LocalStorageKeyValues>(
    key: K,
    value: LocalStorageKeyValues[K]
  ) => void;
  // state: typeof LocalStorageStateDefault;
};

type LocalStorageContext = LocalStorage;

const LocalStorageContext = createContext<LocalStorageContext | undefined>(
  undefined
);

export const LocalStorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [LocalStorage, setLocalStorage] = useState<Storage>();

  /*
  const [localStorageState, setLocalStorageState] = useState(
    LocalStorageStateDefault
  );
  const [keysToDispatch, setKeysToDispatch] = useState<
    Array<Readonly<[key: string, value: string | null]>>
  >([]);

  const getItem: LocalStorage['getItem'] = (k) => {
    return localStorageState[k];
  };

  const removeItem: LocalStorage['removeItem'] = (k) => {
    setKeysToDispatch((p) => [...p, [k, null]]);
    setLocalStorageState({ ...localStorageState, [k]: null });
  };

  const setItem: LocalStorage['setItem'] = (k, v) => {
    setKeysToDispatch((p) => [...p, [k, v]]);
    setLocalStorageState({ ...localStorageState, [k]: v });
  };

  const clear: LocalStorage['clear'] = () => {
    const temp: Record<string, string | null> = {};
    const keysToDispatch = Object.keys(localStorageState).map((k) => {
      temp[k] = null;
      return [k, null] as const;
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setLocalStorageState(temp as any);
    setKeysToDispatch(keysToDispatch);
  };

  const LocalStorageWrapper = {
    getItem,
    removeItem,
    setItem,
    clear,
  };

  useEffect(() => {
    keysToDispatch.forEach(([key, value]) => {
      if (value === null) {
        LocalStorage?.removeItem(key);
      } else {
        LocalStorage?.setItem(key, value);
      }
    });
  }, [keysToDispatch, LocalStorage]);
  */

  useEffect(() => {
    setLocalStorage(localStorage);
  }, []);

  return (
    <LocalStorageContext.Provider value={LocalStorage}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export const LocalStorageConsumer = LocalStorageContext.Consumer;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const useLocalStorage = () => {
  const LocalStorage = useContext(LocalStorageContext);

  return LocalStorage;
};
