import T from 'packages/components/Typography';
import { useId } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const LabelInputWrapper = styled.div`
  width: fit-content;
`;

const Label = styled.label`
  ${T.P3.css}
`;

const InputWrapper = styled.div`
  display: flex;
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.color.text[500]};
  border-radius: ${({ theme }) => theme.spacing.px[50]};
  padding: ${({ theme }) => theme.spacing.rem[50]};

  input {
    ${T.P3.css}
    padding-top: 4px;
    margin: -4px 0;
    border: 0;
    min-width: 0;
    &:focus {
      outline: 0;
    }
    &:disabled {
      color: ${({ theme }) => theme.color.text[300]};
      background-color: ${({ theme }) => theme.color.surface[200]};
    }
  }

  &:focus-within {
    outline: ${({ theme }) => theme.color.base[200]} 4px solid;
  }
  &.disabled {
    background-color: ${({ theme }) => theme.color.surface[200]};
  }
  &:invalid {
    outline: ${({ theme }) => theme.color.destructive[200]} 4px solid;
  }
  &.invalid {
    outline: ${({ theme }) => theme.color.destructive[200]} 4px solid;
  }
`;

const Suffix = styled.span`
  ${T.P3.css}
  padding: 4px 2px 0 0;
  margin: -4px 0;
  color: ${({ theme }) => theme.color.text[300]};
  user-select: none;
`;

type InputProps = React.PropsWithoutRef<JSX.IntrinsicElements['input']> & {
  label: string;
  disabled?: boolean;
  invalid?: boolean;
  suffix?: string;
  wrapperId?: string;
};

const Input = ({
  label,
  suffix,
  disabled,
  invalid,
  id,
  className,
  wrapperId,
  'aria-hidden': ariaHidden,
  ...rest
}: InputProps): JSX.Element => {
  const inputId = id ?? useId();
  const inputWrapperClassName = classNames({
    ['disabled']: disabled,
    ['invalid']: invalid,
  });

  return (
    <LabelInputWrapper
      className={className}
      id={wrapperId}
      aria-hidden={ariaHidden}
    >
      <Label htmlFor={inputId}>{label}</Label>
      <InputWrapper className={inputWrapperClassName}>
        <input id={inputId} disabled={disabled} {...rest} />
        {suffix && <Suffix aria-hidden>{suffix}</Suffix>}
      </InputWrapper>
    </LabelInputWrapper>
  );
};

export default Input;
