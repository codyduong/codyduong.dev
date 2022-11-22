import { createContext, useContext } from 'react';
import { getProject } from '@theatre/core';
import { SheetProvider } from '@theatre/r3f';

type TheatreContextType = {
  getProject: typeof getProject;
  SheetProvider: typeof SheetProvider;
};

const defaultValue = {
  getProject: getProject,
  SheetProvider: SheetProvider,
};

const TheatreContext = createContext<TheatreContextType>(defaultValue);

export const TheatreProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <TheatreContext.Provider value={defaultValue}>
      {children}
    </TheatreContext.Provider>
  );
};

export const TheatreConsumer = TheatreContext.Consumer;

export const useTheatre = (): TheatreContextType => {
  const theatre = useContext(TheatreContext);

  return theatre;
};
