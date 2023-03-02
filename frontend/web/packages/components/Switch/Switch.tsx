import styled, { css } from 'styled-components';
import T from 'packages/components/Typography';
import classnames from 'classnames';
import { commoncss } from 'packages/style';

const SwitchWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  margin-right: auto;
  padding: ${({ theme }) =>
    `${theme.spacing.px(37.5)} ${theme.spacing.px[50]}`};
  padding-right: ${({ theme }) => theme.spacing.px[25]};
  border-radius: ${({ theme }) => theme.spacing.px[50]};
  box-sizing: border-box;
  outline-offset: -2px;

  &:hover {
    background-color: ${({ theme }) => theme.color.base[50]};
  }

  span {
    padding-top: 2px;
  }
`;

const SwitchLabel = styled(T.P3)`
  margin: 0 ${({ theme }) => theme.spacing.rem[75]} 0 0;
`;

const SwitchActual = styled.div`
  border: solid
    ${({ theme }) => `${theme.spacing.px[12.5]} ${theme.color.surface[500]}`};
  border-radius: 0.75rem;
  padding: ${({ theme }) => theme.spacing.px[25]};
  display: inline-flex;
  width: 1.5rem;
  justify-content: flex-start;
  margin-right: ${({ theme }) => theme.spacing.rem[50]};
  position: relative;

  transition: border-color 225ms cubic-bezier(0.4, 0, 0.2, 1) 0s;

  &.switch-on {
    transition: border-color 225ms cubic-bezier(1, 0.2, 0, 0.4) 0s;
    border-color: ${({ theme }) => theme.color.base[300]};
  }
`;

const SwitchCircle = styled.div`
  display: inline-block;
  aspect-ratio: 1;
  min-height: ${({ theme }) => theme.spacing.rem[75]};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.surface[500]};

  transition: all 225ms cubic-bezier(0.4, 0, 0.2, 1) 0s;

  &.switch-on {
    transition: all 225ms cubic-bezier(1, 0.2, 0, 0.4) 0s;
    background-color: ${({ theme }) => theme.color.base[300]};
    transform: translateX(100%);
  }

  && {
    ${() =>
      commoncss.animation({
        enabled: css`
          transition-property: transform, background-color;
        `,
        disabled: css`
          transition-property: background-color;
        `,
      })}
  }
`;

const SwitchState = styled(T.P4)`
  display: inline-block;
  min-width: 3ch;
`;

type SwitchProps = {
  label: string;
  showLabel?: boolean;
  checked: boolean | undefined;
  setChecked: React.Dispatch<boolean>;
  className?: string | undefined;
  buttonProps?: Omit<
    React.PropsWithoutRef<JSX.IntrinsicElements['button']>,
    | 'role'
    | 'aria-checked'
    | 'onClick'
    | 'tabIndex'
    | 'aria-label'
    | 'className'
  >;
};

const Switch = ({
  label,
  showLabel = true,
  checked,
  setChecked,
  className,
  buttonProps,
}: SwitchProps): JSX.Element => {
  const switchState = classnames({
    ['switch-off']: !checked,
    ['switch-on']: checked,
  });

  return (
    <SwitchWrapper
      {...buttonProps}
      role="switch"
      aria-checked={checked}
      onClick={() => {
        setChecked(!checked);
      }}
      tabIndex={0}
      aria-label={!showLabel ? label : undefined}
      className={className}
    >
      {showLabel && <SwitchLabel as="span">{label}</SwitchLabel>}
      <SwitchActual aria-hidden className={switchState}>
        <SwitchCircle className={switchState} />
      </SwitchActual>
      <SwitchState as="span" aria-hidden>
        {checked ? 'on' : 'off'}
      </SwitchState>
    </SwitchWrapper>
  );
};

export default Switch;
