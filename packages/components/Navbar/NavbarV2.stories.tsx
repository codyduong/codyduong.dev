import NavbarV2 from './NavbarV2';
import { withRouter } from 'storybook-addon-react-router-v6';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'App/Components/NavbarV2',
  component: NavbarV2,
  decorators: [withRouter],
} as ComponentMeta<typeof NavbarV2>;

export const Primary: ComponentStory<typeof NavbarV2> = () => <NavbarV2 />;
