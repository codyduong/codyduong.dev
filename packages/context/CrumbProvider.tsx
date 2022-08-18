import React, { useState, createContext, useContext } from 'react';

export type Crumb<T extends string = string> = {
  //List the content name and then have a component as a override
  name: T;
  element?: undefined | React.ComponentType<any>;
  state?: any;
};

export type Crumbs<T extends string = string> = Crumb<T>[];

const defaultCrumbs: Crumbs = [];

export type CrumbsContextType = {
  crumbs: Crumbs;
  setCrumbs: React.Dispatch<React.SetStateAction<Crumbs>>;
  pushCrumb: (input: Crumb) => void;
  popCrumb: () => void;
};

const CrumbsContext = createContext<CrumbsContextType>({
  crumbs: defaultCrumbs,
  setCrumbs: (): void => {
    return;
  },
  pushCrumb: (): void => {
    return;
  },
  popCrumb: (): void => {
    return;
  },
});

export const createCrumbsProviderValue = (): CrumbsContextType => {
  const [currentBreadCrumbs, setCurrentBreadCrumbs] =
    useState<Crumbs>(defaultCrumbs);

  const pushBreadCrumb = (input: Crumb): void => {
    setCurrentBreadCrumbs([...currentBreadCrumbs, input]);
  };

  const popBreadCrumb = (): void => {
    setCurrentBreadCrumbs([...currentBreadCrumbs.slice(0, -1)]);
  };

  const value: CrumbsContextType = {
    crumbs: currentBreadCrumbs,
    setCrumbs: setCurrentBreadCrumbs,
    pushCrumb: pushBreadCrumb,
    popCrumb: popBreadCrumb,
  };

  return value;
};

export const CrumbsProvider = ({
  children,
  value = createCrumbsProviderValue(),
}: {
  children: React.ReactNode;
  value?: CrumbsContextType;
}): JSX.Element => {
  return (
    <CrumbsContext.Provider value={value}>{children}</CrumbsContext.Provider>
  );
};

export const CrumbsConsumer = CrumbsContext.Consumer;

export const useCrumbs = (): CrumbsContextType => {
  const context = useContext(CrumbsContext);

  return context;
};
