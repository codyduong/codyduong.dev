import { Meta } from '@storybook/react';
import { Spinner as S } from 'packages/components/SpinkitLoadable';
import styled from 'styled-components';

export default {
  title: 'Components',
  component: S,
  decorators: undefined,
  parameters: {
    controls: { sort: 'none' },
  },
} as Meta;

const SpinnerContainer = styled.div``;

export const SpinkitSpinner = (): JSX.Element => {
  return <S />;
};
