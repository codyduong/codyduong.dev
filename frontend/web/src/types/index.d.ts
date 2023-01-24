/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    __APOLLO_STATE__: any;
    __GRAPHQLURL__: string;
  }
}

export {};
