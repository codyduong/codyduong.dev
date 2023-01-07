import React from 'react';
import { createContext, useContext } from 'react';

type ModalContext = {
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  onExit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const ModalContextDefaultValue = {
  ariaLabelledBy: undefined,
  ariaDescribedBy: undefined,
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  onExit: (): void => {},
};

const ModalContext = createContext<ModalContext>(ModalContextDefaultValue);

export const ModalContextProvider = ({
  value = ModalContextDefaultValue,
  children,
}: {
  value: ModalContext;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const ModalConsumer = ModalContext.Consumer;

export const useModal = (): ModalContext => {
  const context = useContext(ModalContext);

  return context;
};
