import Navbar from './Navbar';
import { withRouter } from 'storybook-addon-react-router-v6';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'App/Components/Navbar',
  component: Navbar,
  decorators: [withRouter],
} as ComponentMeta<typeof Navbar>;

export const Primary: ComponentStory<typeof Navbar> = () => <Navbar />;
