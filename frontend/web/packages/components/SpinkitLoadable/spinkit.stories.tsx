import { Meta } from '@storybook/react';
import { Spinner as S } from 'packages/components/SpinkitLoadable';

export default {
  title: 'Atoms/SpinkitSpinner',
  component: S,
  decorators: undefined,
  parameters: {
    controls: { sort: 'none' },
  },
} as Meta;

export const SpinkitSpinner = (): JSX.Element => {
  return <S />;
};
