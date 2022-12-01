import React from 'react';
import { createContext, useContext } from 'react';

type HttpContext = {
  redirect: string | null;
  setRedirect: React.Dispatch<React.SetStateAction<string | null>>;
};

export const HttpContextDefaultValue = {
  redirect: null,
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  setRedirect: (): void => {},
};

const HttpContext = createContext<HttpContext>(HttpContextDefaultValue);

export const HttpContextProvider = ({
  context = HttpContextDefaultValue,
  children,
}: {
  context: HttpContext;
  children: React.ReactNode;
}): JSX.Element => {
  const [redirect, setRedirectPartial] =
    React.useState<HttpContext['redirect']>(null);

  function setRedirect(s: React.SetStateAction<string | null>): void {
    if (typeof s == 'function') {
      context['redirect'] = s(redirect);
      setRedirectPartial(s);
    } else {
      context['redirect'] = s;
      setRedirectPartial(s);
    }
  }

  return (
    <HttpContext.Provider value={{ redirect, setRedirect }}>
      {children}
    </HttpContext.Provider>
  );
};

export const HttpConsumer = HttpContext.Consumer;

export const useHttp = (): HttpContext => {
  const context = useContext(HttpContext);

  return context;
};
