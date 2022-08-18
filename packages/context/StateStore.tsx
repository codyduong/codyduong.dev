import React, { useState, createContext, useContext } from 'react';

export type StateStore = {
  stateStore: Record<string, any>;
  setStateStore: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  getKeyValueFrom: <T = any>(k: string) => T | undefined;
  setKeyValueTo: <T = any>(k: string, state: T) => void;
};

const defaultStateStore = {};

const StateStoreContext = createContext<StateStore>({
  stateStore: defaultStateStore,
  setStateStore: (): void => {
    return;
  },
  getKeyValueFrom: (_k): undefined => {
    return;
  },
  setKeyValueTo: (_k, _s): void => {
    return;
  },
});

export const createStateStoreProviderValue = (): StateStore => {
  const [currentStateStore, setCurrentStateStore] =
    useState<Record<string, any>>(defaultStateStore);

  function getKeyValueFrom<T>(k: string): T | undefined {
    return currentStateStore[k];
  }

  function setKeyValueTo<T>(k: string, state: T): void {
    setCurrentStateStore({ ...currentStateStore, [k]: state });
  }

  const value: StateStore = {
    stateStore: currentStateStore,
    setStateStore: setCurrentStateStore,
    getKeyValueFrom,
    setKeyValueTo,
  };

  return value;
};

export const StateStoreProvider = ({
  children,
  value = createStateStoreProviderValue(),
}: {
  children: React.ReactNode;
  value?: StateStore;
}): JSX.Element => {
  return (
    <StateStoreContext.Provider value={value}>
      {children}
    </StateStoreContext.Provider>
  );
};

export const StateStoreConsumer = StateStoreContext.Consumer;

export const useStateStore = (): StateStore => {
  const context = useContext(StateStoreContext);

  return context;
};
