import React from 'react';
import { useState } from 'react';

type LocalStorageKeyValues = {
  token: `Bearer ${string}`;
  paragraphWidth: number;
  disableInteractionAnimations: boolean;
};

export type LocalStorageState = {
  [K in keyof LocalStorageKeyValues]: LocalStorageKeyValues[K] | null;
};

export type UseLocalStorageReturn<K extends keyof LocalStorageState> = Readonly<
  [
    state: LocalStorageState[K],
    setState: React.Dispatch<React.SetStateAction<LocalStorageState[K]>>
  ]
>;

export default function useLocalStorage<K extends keyof LocalStorageState>(
  key: K,
  initialValue?: LocalStorageState[K]
): UseLocalStorageReturn<K> {
  const [storedValue, setStoredValue] = useState<LocalStorageState[K]>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue: UseLocalStorageReturn<K>[1] = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}
