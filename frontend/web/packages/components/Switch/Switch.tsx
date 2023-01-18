import styled from 'styled-components';
import T from 'packages/components/Typography';
import classnames from 'classnames';

const SwitchWrapper = styled.button`
  display: inline-block;
  margin-right: auto;
  padding: ${({ theme }) => theme.spacing.px[50]};
  border-radius: ${({ theme }) => theme.spacing.px[50]};
  box-sizing: border-box;
  outline-offset: -2px;

  &:hover {
    background-color: #eee;
  }
`;

const SwitchLabel = styled(T.P3)`
  margin: 0 ${({ theme }) => theme.spacing.rem[50]} 0 0;
`;

const SwitchActual = styled.div`
  border: solid
    ${({ theme }) => `${theme.spacing.px[12.5]} ${theme.color.surface[500]}`};
  border-radius: 1em;
  padding: ${({ theme }) => theme.spacing.rem[25]};
  display: inline-flex;
  width: 2rem;
  justify-content: flex-start;
  margin-right: ${({ theme }) => theme.spacing.rem[50]};
  position: relative;
`;

const SwitchCircle = styled.div`
  display: inline-block;
  aspect-ratio: 1;
  min-height: ${({ theme }) => theme.spacing.rem[100]};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.base[300]};
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0s;

  &.switch-on {
    transition: transform 225ms cubic-bezier(1, 0.2, 0, 0.4) 0s;
    transform: translateX(100%);
  }
`;

const SwitchState = styled(T.P3)`
  display: inline-block;
  min-width: 1.5em;
`;

type SwitchProps = {
  label: string;
  showLabel?: boolean;
  checked: boolean | undefined;
  setChecked: React.Dispatch<boolean>;
  className?: string | undefined;
};

const Switch = ({
  label,
  showLabel = true,
  checked,
  setChecked,
  className,
}: SwitchProps): JSX.Element => {
  const switchCircle = classnames({
    ['switch-on']: checked,
  });

  return (
    <SwitchWrapper
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
      <SwitchActual aria-hidden>
        <SwitchCircle className={switchCircle} />
      </SwitchActual>
      <SwitchState as="span" aria-hidden>
        {checked ? 'on' : 'off'}
      </SwitchState>
    </SwitchWrapper>
  );
};

export default Switch;
