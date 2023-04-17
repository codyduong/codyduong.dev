/* eslint-disable react/no-children-prop */
import { Meta } from '@storybook/react';
import { Button as B, ButtonProps } from './Button';
import T from 'packages/components/Typography';
import styled from 'styled-components';
import React from 'react';

export default {
  title: 'Atoms/Buttons',
  component: B,
  decorators: undefined,
  parameters: {
    controls: { sort: 'none' },
  },
} as Meta;

const Title = styled.h2`
  ${T.H1.css}
`;

const StoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: fit-content;
`;

const StyledGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;

interface CascadingReactComponent extends ButtonProps {
  children: React.ReactNode;
  text?: React.ReactNode;
}

const Group = ({
  children,
  text,
  ...rest
}: CascadingReactComponent): JSX.Element => {
  const childNodes = React.Children.toArray(children).map((E, i) =>
    React.isValidElement(E) ? (
      E.type === B ? (
        <E.type key={i} {...rest} {...E.props} children={text} />
      ) : (
        E
      )
    ) : (
      E
    )
  );

  return <StyledGroup>{childNodes}</StyledGroup>;
};

const StyledClassWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 16px;
  gap: 16px;
`;

const ClassWrapper = ({
  children,
  text,
  ...rest
}: CascadingReactComponent): JSX.Element => {
  const childNodes = React.Children.toArray(children).map((E, i) =>
    React.isValidElement(E) ? (
      E.type === Group ? (
        <E.type key={i} {...rest} {...E.props} text={text} />
      ) : (
        E
      )
    ) : (
      E
    )
  );

  return <StyledClassWrapper>{childNodes}</StyledClassWrapper>;
};
export const Buttons = (): JSX.Element => {
  return (
    <StoryWrapper>
      <Title>Primary</Title>
      <ClassWrapper hierarchy="primary" text="Press Me">
        <Group>
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
        <Group className="hover">
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
        <Group className="active">
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
        <Group disabled>
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
      </ClassWrapper>
      <ClassWrapper hierarchy="primary" action="destructive" text="Explode">
        <Group>
          <B size="large" children={''} />
          <B size="medium" />
          <B size="small" />
        </Group>
        <Group className="hover">
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
        <Group className="active">
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
        <Group disabled>
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
      </ClassWrapper>
      <ClassWrapper hierarchy="primary" action="productive" text="Create">
        <Group>
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
        <Group className="hover">
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
        <Group className="active">
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
        <Group disabled>
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
      </ClassWrapper>
      <Title>Secondary</Title>
      <ClassWrapper hierarchy="secondary" text="Press Me">
        <Group>
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
        <Group className="hover">
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
        {/* <Group className="active">
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group> */}
        <Group disabled>
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
      </ClassWrapper>
      <ClassWrapper hierarchy="secondary" action="destructive" text="Explode">
        <Group>
          <B size="large" children={''} />
          <B size="medium" />
          <B size="small" />
        </Group>
        <Group className="hover">
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
        {/* <Group className="active">
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group> */}
        <Group disabled>
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
      </ClassWrapper>
      <ClassWrapper hierarchy="secondary" action="productive" text="Create">
        <Group>
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
        <Group className="hover">
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
        {/* <Group className="active">
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group> */}
        <Group disabled>
          <B size="large" />
          <B size="medium" />
          <B size="small" />
        </Group>
      </ClassWrapper>
    </StoryWrapper>
  );
};
