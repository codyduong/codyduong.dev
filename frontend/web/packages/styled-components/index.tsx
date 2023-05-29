/*
https://github.com/styled-components/styled-components/issues/3437#issuecomment-1103085056

WORKAROUND FOR styled-components ESM interop
Remove when upgrading to styled-components ^6, as well as the alias in tsconfig
*/

import styled from 'styled-components';

export * from 'styled-components';

const defaultStyled: typeof styled =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: w/e
  typeof styled === 'function' ? styled : styled.default;

export { defaultStyled as default };
