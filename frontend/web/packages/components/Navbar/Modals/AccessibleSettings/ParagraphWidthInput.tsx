import classNames from 'classnames';
import { SimpleInput } from 'packages/components/Input';
import { useAccessibility } from 'packages/mono-app/context/AccessibilityContext';
import { commoncss } from 'packages/style';
import { useEffect, useState } from 'react';
import styled, { css } from 'packages/styled-components';
import { StyledSwitch } from './common';

const StyledInput = styled(SimpleInput)`
  margin-left: ${({ theme }) => theme.spacing.px[100]};

  div {
    max-width: 8ch;
    margin-bottom: ${({ theme }) => theme.spacing.px[50]};
  }

  box-sizing: content-box;
  transition: all 225ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  max-height: 72px;

  &:not(.enabled) {
    max-height: 0;
    transition: all 225ms cubic-bezier(1, 0.2, 0, 0.4) 0s;
    opacity: 0;
    overflow: hidden;
  }

  && {
    ${() =>
      commoncss.animation({
        enabled: css`
          transition-property: opacity, max-height;
        `,
        disabled: css`
          transition-property: none;
          max-height: fit-content;
          opacity: 1;
        `,
      })}
  }
`;

interface ParagraphWidthInputProps {
  checked: boolean | undefined;
  setChecked: React.Dispatch<boolean>;
}

const ParagraphWidthInput = ({
  checked,
  setChecked,
}: ParagraphWidthInputProps): JSX.Element => {
  const { paragraphWidth, setParagraphWidth } = useAccessibility();
  const [value, setValue] = useState(
    typeof paragraphWidth === 'number' ? `${paragraphWidth}` : '80'
  );
  const [focus, setFocus] = useState(false);

  const handleValue = (s: string): void => {
    try {
      const coerce = Number(s);
      if (Number.isNaN(coerce)) {
        setParagraphWidth(undefined);
      } else {
        setParagraphWidth(coerce);
      }
    } catch (e) {
      if (e instanceof TypeError) {
        setParagraphWidth(undefined);
      }
      throw e;
    }
  };

  useEffect(() => {
    if (checked) {
      !focus && handleValue(value);
    } else {
      setParagraphWidth(undefined);
    }
  }, [value, checked, focus]);

  const inputClassName = classNames({
    ['enabled']: checked,
  });

  return (
    <>
      <StyledSwitch
        label="Limit Paragraph Width"
        checked={checked}
        setChecked={setChecked}
        aria-controls="paragraph-width"
      />
      <StyledInput
        disabled={!checked}
        label="Width, in characters"
        suffix="chars"
        inputMode="numeric"
        className={inputClassName}
        aria-hidden={!checked}
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
      />
    </>
  );
};

export default ParagraphWidthInput;
