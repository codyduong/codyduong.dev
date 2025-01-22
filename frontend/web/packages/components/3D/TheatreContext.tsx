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

export const TheatreProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return <TheatreContext value={defaultValue}>{children}</TheatreContext>;
};

export const TheatreConsumer = TheatreContext.Consumer;

// eslint-disable-next-line react-refresh/only-export-components
export const useTheatre = (): TheatreContextType => {
  const theatre = useContext(TheatreContext);

  return theatre;
};

export default TheatreProvider;
