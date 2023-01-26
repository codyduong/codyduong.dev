import classNames from 'classnames';
import { commoncss } from 'packages/style';
import { ForwardedRef } from 'react';
import styled from 'styled-components';
import { Paragraph } from 'packages/components/Typography';
import Color from 'color';

const ButtonStyled = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px 6px;
  gap: 8px;
  border-radius: 16px;
  transition: background-color 225ms ease-out, color 225ms ease-out,
    border 225ms ease-out;
  transition-delay: 50ms;
  box-sizing: border-box;
  height: 48px;

  ${Paragraph.P2.bold.css}

  &.button-primary {
    background: ${({ theme }) => theme.color.base[300]};
    color: ${({ theme }) => theme.color.text[100]};
    &:hover {
      background: ${({ theme }) => theme.color.base[500]};
    }
    &.button-destructive {
      background: ${({ theme }) => theme.color.destructive[300]};
      &:hover {
        background: ${({ theme }) => theme.color.destructive[500]};
      }
    }
    &.button-productive {
      background: ${({ theme }) => theme.color.productive[300]};
      &:hover {
        background: ${({ theme }) => theme.color.productive[500]};
      }
    }
    &.disabled {
      background: ${({ theme }) => theme.color.surface[350]};
      color: ${({ theme }) => theme.color.text[400]};
      cursor: not-allowed;
    }
  }

  &.button-secondary {
    border: 3px solid ${({ theme }) => theme.color.text[300]};
    color: ${({ theme }) => theme.color.text[300]};
    &:hover {
      background: ${({ theme }) =>
        Color(theme.color.surface[350]).alpha(0.2).toString()};
    }
    &.button-destructive {
      border: 3px solid ${({ theme }) => theme.color.destructive[200]};
      color: ${({ theme }) => theme.color.destructive[200]};
      &:hover {
        background: ${({ theme }) =>
          Color(theme.color.destructive[200]).alpha(0.2).toString()};
      }
    }
    &.button-productive {
      border: 3px solid ${({ theme }) => theme.color.productive[200]};
      color: ${({ theme }) => theme.color.productive[200]};
      &:hover {
        background: ${({ theme }) =>
          Color(theme.color.productive[200]).alpha(0.15).toString()};
      }
    }
    &.disabled {
      background: ${({ theme }) => theme.color.surface[200]};
      border: 3px solid ${({ theme }) => theme.color.text[300]};
      color: ${({ theme }) => theme.color.text[300]};
      cursor: not-allowed;
    }
  }

  ${commoncss.focus}
`;

export const ButtonHierarchy = {
  primary: 'primary',
  secondary: 'secondary',
} as const;

export const ButtonAction = {
  default: 'default',
  destructive: 'destructive',
  productive: 'productive',
} as const;

export type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'ref'> & {
  ref?: ForwardedRef<HTMLButtonElement>;
  hierarchy?: typeof ButtonHierarchy[keyof typeof ButtonHierarchy];
  action?: typeof ButtonAction[keyof typeof ButtonAction];
};

export const Button = ({
  hierarchy = 'primary',
  action = 'default',
  className: oldClassName,
  disabled,
  children,
  ...rest
}: ButtonProps): JSX.Element => {
  const className = classNames(oldClassName, {
    ['button-primary']: hierarchy == ButtonHierarchy.primary,
    ['button-secondary']: hierarchy == ButtonHierarchy.secondary,
    ['button-destructive']: action == ButtonAction.destructive,
    ['button-productive']: action == ButtonAction.productive,
    ['disabled']: disabled,
  });

  return (
    <ButtonStyled className={className} disabled={disabled} {...rest}>
      {children}
    </ButtonStyled>
  );
};
