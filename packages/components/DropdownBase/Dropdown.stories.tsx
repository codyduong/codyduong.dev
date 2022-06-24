import Dropdown from './Dropdown';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Inputs/Base/DropdownBase',
  component: Dropdown,
  argTypes: {
    defaultSelect: {
      defaultValue: '1',
    },
    options: {
      defaultValue: [
        {
          value: '1',
          label: 'Option 1',
        },
        {
          value: '2',
          label: 'Option 2',
        },
        {
          value: '3',
          label: 'Option 3',
        },
      ],
    },
  },
} as ComponentMeta<typeof Dropdown>;

export const Primary: ComponentStory<typeof Dropdown> = (values) => (
  <Dropdown {...values} />
);
