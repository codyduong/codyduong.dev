import styled from 'styled-components';
import Switch from 'packages/components/Switch';

export const StyledSwitch = styled(Switch)`
  margin-left: ${({ theme }) => `-${theme.spacing.px[50]}`};
`;
