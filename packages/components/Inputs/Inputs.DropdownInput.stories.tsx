import { DropdownInput } from './Inputs';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Inputs/Drop In/DropdownInput',
  component: DropdownInput,
  argTypes: {
    label: {
      defaultValue: 'Label',
    },
    justifyLabel: {
      defaultValue: 'left',
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
} as ComponentMeta<typeof DropdownInput>;

export const Primary: ComponentStory<typeof DropdownInput> = (values) => (
  <DropdownInput {...values} />
);
