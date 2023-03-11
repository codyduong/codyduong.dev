import classNames from 'classnames';
import { commoncss } from 'packages/style';
import {
  useRef,
  useEffect,
  isValidElement,
  createElement,
  forwardRef,
} from 'react';
import styled, { css } from 'styled-components';
import { Paragraph } from 'packages/components/Typography';
import Color from 'color';

const ButtonStyled = styled.button`
  display: flex;
  flex-direction: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;
  border-radius: 16px;
  transition: background-color 225ms ease-out, color 225ms ease-out,
    border 225ms ease-out;
  transition-delay: 50ms;
  box-sizing: border-box;

  &.lg {
    height: 48px;
    padding-top: 10px;
    padding-bottom: 7px;
    ${Paragraph.P2.bold.css}
    & > svg {
      padding-bottom: 2px;
    }
  }

  &.md {
    height: 42px;
    padding-top: 7px;
    padding-bottom: 4px;
    ${Paragraph.P3.bold.css}
    & > svg {
      padding-bottom: 3px;
    }
  }

  &.sm {
    height: 36px;
    padding-top: 7px;
    padding-bottom: 4px;
    ${Paragraph.P4.bold.css}
    & > svg {
      padding-bottom: 4px;
    }
  }

  &.primary {
    background: ${({ theme }) => theme.color.base[300]};
    color: ${({ theme }) => theme.color.text[100]};
    &:hover {
      background: ${({ theme }) => theme.color.base[100]};
    }
    &:active {
      box-shadow: inset 2px 2px 4px 2px rgba(0, 0, 0, 0.5);
    }
    &.destructive {
      background: ${({ theme }) => theme.color.destructive[300]};
      &:hover {
        background: ${({ theme }) => theme.color.destructive[200]};
      }
    }
    &.productive {
      background: ${({ theme }) => theme.color.productive[300]};
      &:hover {
        background: ${({ theme }) => theme.color.productive[200]};
      }
    }
    &.disabled {
      background: ${({ theme }) => theme.color.surface[350]};
      color: ${({ theme }) => theme.color.text[400]};
      cursor: not-allowed;
    }
  }

  &.secondary {
    border: 3px solid ${({ theme }) => theme.color.text[300]};
    color: ${({ theme }) => theme.color.text[300]};
    &:hover {
      background: ${({ theme }) =>
        Color(theme.color.surface[350]).alpha(0.2).toString()};
    }
    &.destructive {
      border: 3px solid ${({ theme }) => theme.color.destructive[200]};
      color: ${({ theme }) => theme.color.destructive[200]};
      &:hover {
        background: ${({ theme }) =>
          Color(theme.color.destructive[200]).alpha(0.2).toString()};
      }
    }
    &.productive {
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

  transition: all 225ms 125ms;
  transition-property: background-color;

  ${commoncss.focus}
`;

export const ButtonSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

const ButtonSizeRemap = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
} as const;

export const ButtonHierarchy = {
  primary: 'primary',
  secondary: 'secondary',
} as const;

export const ButtonAction = {
  default: 'default',
  destructive: 'destructive',
  productive: 'productive',
} as const;

export type IconProps = {
  width?: number;
  height?: number;
};

export type ButtonRef = {
  button?: React.LegacyRef<HTMLButtonElement>;
  icon?: React.LegacyRef<SVGSVGElement>;
};

export type ButtonProps = React.PropsWithoutRef<
  JSX.IntrinsicElements['button']
> & {
  hierarchy?: typeof ButtonHierarchy[keyof typeof ButtonHierarchy];
  action?: typeof ButtonAction[keyof typeof ButtonAction];
  size?: typeof ButtonSize[keyof typeof ButtonSize];
  ref?: React.MutableRefObject<ButtonRef | null>;
  icon?: React.ComponentType<JSX.IntrinsicElements['svg']> | React.ReactNode;
} & IconProps;

export const Button = ({
  hierarchy = 'primary',
  action = 'default',
  size = 'medium',
  className: oldClassName,
  disabled,
  children,
  ref = useRef<ButtonRef>({}),

  icon: c,
  width,
  height,

  ...rest
}: ButtonProps): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef(null);

  const className = classNames(oldClassName, 'button', ButtonSizeRemap[size], {
    ['primary']: hierarchy == ButtonHierarchy.primary,
    ['secondary']: hierarchy == ButtonHierarchy.secondary,
    ['destructive']: action == ButtonAction.destructive,
    ['productive']: action == ButtonAction.productive,
    ['disabled']: disabled,
  });

  useEffect(() => {
    return () => {
      ref.current = null;
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.button = buttonRef;
    }
  }, [buttonRef]);

  useEffect(() => {
    if (ref.current) {
      ref.current.icon = iconRef;
    }
  }, [iconRef]);

  const iconProps: IconProps = {};
  const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
    iconProps,
    ref
  ): React.ReactElement<IconProps> {
    return isValidElement(c)
      ? c
      : typeof c === 'function' ||
        (c !== null &&
          typeof c === 'object' &&
          'render' in c &&
          typeof (c as any)['render'] === 'function')
      ? createElement(c as any, { ...iconProps, ref })
      : (c as any);
  });

  return (
    <ButtonStyled
      ref={buttonRef}
      className={className}
      disabled={disabled}
      {...rest}
    >
      <Icon ref={iconRef} {...iconProps} />
      {children}
    </ButtonStyled>
  );
};
