declare module '*.svg?react' {
  import * as React from 'react';

  export default src as React.FunctionComponent<React.SVGProps<SVGElement>>;
}

declare module '@fontsource/*';
