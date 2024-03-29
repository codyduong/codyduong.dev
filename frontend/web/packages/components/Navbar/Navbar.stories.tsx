import { Meta } from '@storybook/react';
import N from 'packages/components/Navbar';
import { withRouter } from 'storybook-addon-react-router-v6';
import styled from 'styled-components';

export default {
  title: 'Components/Navbar',
  component: N,
  decorators: [withRouter],
  parameters: {
    controls: { sort: 'none' },
  },
} as Meta;

const NavbarWrapper = styled.div`
  margin: -64px;
`;

export const Navbar = (): JSX.Element => {
  return (
    <NavbarWrapper>
      <N />
    </NavbarWrapper>
  );
};
