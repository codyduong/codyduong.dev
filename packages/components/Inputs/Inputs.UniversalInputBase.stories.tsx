import { UniversalInputBase } from './Inputs';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Inputs/Base/UniversalInputBase',
  component: UniversalInputBase,
  args: {
    type: 'text',
    value: undefined,
    label: 'Label',
    placeholder: 'Number/Text Placeholder',
    justifyValue: 'left',
    justifyLabel: 'left',
    displayLabelType: 'top',
    displayDropdownSide: 'left',
  },
  argTypes: {
    type: {
      control: 'select',
      // TODO add other types
      options: ['text', 'number'],
    },
  },
} as ComponentMeta<typeof UniversalInputBase>;

export const Primary: ComponentStory<typeof UniversalInputBase> = (values) => (
  <UniversalInputBase {...values} />
);
