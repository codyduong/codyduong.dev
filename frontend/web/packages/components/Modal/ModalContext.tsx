import React from 'react';
import { createContext, useContext } from 'react';

type ModalContext = {
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  onExit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ModalContextDefaultValue = {
  ariaLabelledBy: undefined,
  ariaDescribedBy: undefined,

  onExit: (): void => {},
};

const ModalContext = createContext<ModalContext>(ModalContextDefaultValue);

export const ModalContextProvider = ({
  value = ModalContextDefaultValue,
  children,
}: {
  value: ModalContext;
  children: React.ReactNode;
}): React.JSX.Element => {
  return <ModalContext value={value}>{children}</ModalContext>;
};

export const ModalConsumer = ModalContext.Consumer;

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = (): ModalContext => {
  const context = useContext(ModalContext);

  return context;
};
