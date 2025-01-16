import { commoncss } from 'packages/style';
import { forwardRef } from 'react';
import styled from 'styled-components';

export const ABase = forwardRef<HTMLAnchorElement, JSX.IntrinsicElements['a'] & { hoverColor?: string }>(
  ({ hoverColor: _, ...rest }, ref) => {
    return <a ref={ref} rel="noreferrer noopener" {...rest} />;
  },
);
ABase.displayName = 'A';

export const A = styled(ABase)`
  text-decoration: none;
  user-select: none;
  :hover {
    cursor: pointer;
  }
  ${commoncss.focus}
`;
