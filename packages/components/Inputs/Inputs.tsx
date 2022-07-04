import React, { useRef, useState } from 'react';
import styled, { StyledComponentProps } from 'styled-components';
import Dropdown, { DropdownOption } from '../DropdownBase';
import { convertFromTo, numberifyString } from '../../util/conversion';

// eslint-disable-next-line prettier/prettier
const StyledInputUniversal = styled.div<{ justifylabel?: 'left' | 'right'; customwidth?: string | number }>`
  display: inline-block;
  width: ${({ customwidth }): string | number => customwidth ?? 'auto'};
  height: auto;
  margin-top: 16px;
  margin-bottom: 8px;
  text-align: ${({ justifylabel }): 'left' | 'right' => justifylabel ?? 'left'};
  //box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.54);
`;

const StyledLabel = styled.label<{ isfocus?: boolean }>`
  display: block;
  font-size: 0.75rem;
  padding: 0 10px;
  color: ${({ theme, isfocus }): string =>
    isfocus ? theme.cyan : 'rgba(0, 0, 0, 0.54)'};
`;

const TextInputWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-flow: row nowrap;
`;

const InputLabel = styled.div`
  display: inline-block;
  padding: 0.5rem;
  height: auto;
`;

const StyledInput = styled.input<{ displayside: 'left' | 'right' }>`
  //Disable default appearance
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  -moz-appearance: textfield;
  display: inline-block;
  min-width: 50px;
  width: 100%;
  min-height: 1rem;
  border-width: 0;
  text-align: ${({ displayside }): 'left' | 'right' => displayside};
  font-size: 1rem;
  outline: none;
  background-color: rgb(0, 0, 0, 0);
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #000000;
  :focus {
    padding-bottom: 0.5rem;
    border-bottom: ${({ theme }): string => `1px solid  ${theme.cyan}`};
  }
`;

interface InputOption extends DropdownOption {
  ratio?: number;
}

export interface InputOptionAssociativeArray {
  [index: string]: InputOption;
}

export type NumberUnit = {
  value: number;
  unit: {
    value: string;
    label: string;
  };
};

interface InputUniversalElement extends HTMLInputElement {
  converted?: NumberUnit;
}

export interface UniversalInputBaseProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  placeholder?: string;
  label?: string;
  justifyValue?: 'left' | 'right';
  justifyLabel?: 'left' | 'right';
  displayLabelType?: 'top' | 'inline';
  displayDropdownSide?: 'left' | 'right';
  defaultDropdownSelectValue?: string;
  strict?: boolean;
  onChange?: React.ChangeEventHandler<InputUniversalElement>;
  options?: InputOptionAssociativeArray;
  onChangeOption?: React.ChangeEventHandler<HTMLSelectElement>;
  convertTo?: string;
}

export const UniversalInputBase = (
  props: UniversalInputBaseProps
): JSX.Element => {
  const {
    justifyValue = 'left',
    label,
    justifyLabel = 'left',
    displayLabelType = 'top',
    displayDropdownSide = 'right',
    defaultDropdownSelectValue,
    options,
    onChangeOption,
    convertTo: exportAs,
    onChange,
    type = 'text',
    width = '400px',
    onFocus,
    onBlur,
    strict = false,
    ...other
  } = props;
  const dropdownOptions = options
    ? Object.keys(options).map((key) => {
        return options[key];
      })
    : undefined;

  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [eventRef, setEventRef] =
    useState<React.ChangeEvent<InputUniversalElement>>();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [value, setValue] = useState<string | undefined>();
  const [selectedOption, setSelectedOption] = useState<InputOption | undefined>(
    dropdownOptions?.[0]
  );

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (type === 'number') {
      e.target.value = String(
        +numberifyString(e.target.value).toFixed(2) || ''
      );
    }
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<InputUniversalElement>): void => {
    if (type === 'number') {
      const _ = e;
      _.target.converted = {
        value: numberifyString(e.target.value),
        unit: {
          value: selectedOption?.value ?? '',
          label: options?.[selectedOption?.value ?? '']?.label ?? '',
        },
      };
      if (exportAs && exportAs !== selectedOption?.value) {
        const n = convertFromTo(
          numberifyString(e.target.value),
          selectedOption?.ratio ?? 1,
          options?.[exportAs]?.ratio ?? 1
        );
        _.target.converted = {
          value: n,
          unit: {
            value: exportAs,
            label: options?.[exportAs]?.label ?? '',
          },
        };
        onChange?.(_);
        setEventRef(_);
        setValue(String(n));
      } else {
        onChange?.(_);
        setEventRef(_);
        setValue(e.target.value);
      }
    } else {
      onChange?.(e);
      setEventRef(e);
      setValue(e.target.value);
    }
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (type === 'number') {
      const n = value
        ? `${convertFromTo(
            numberifyString(value),
            selectedOption?.ratio ?? 1,
            options?.[e.target.value]?.ratio ?? 1
          )}`
        : undefined;
      setValue(n);
      inputRef.current.value = String(+Number(n).toFixed(2));
      eventRef &&
        handleChange({
          ...eventRef,
          target: { ...eventRef.target, value: String(n) },
        });
    }
    setSelectedOption(options?.[e.target.value]);
    onChangeOption?.(e);
  };

  return (
    <>
      {dropdownOptions ? (
        <StyledInputUniversal justifylabel={justifyLabel} customwidth={width}>
          <StyledLabel isfocus={isFocused}>{label}</StyledLabel>
          <TextInputWrapper>
            {displayDropdownSide === 'left' && (
              <Dropdown
                options={dropdownOptions as DropdownOption[]}
                defaultSelect={defaultDropdownSelectValue}
                onChange={handleOptionChange}
              />
            )}
            <StyledInput
              // eslint-disable-next-line @typescript-eslint/ban-types
              {...(other as StyledComponentProps<'input', any, {}, never>)}
              ref={inputRef}
              displayside={justifyValue}
              type={strict ? type : 'text'}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {displayDropdownSide === 'right' && (
              <Dropdown
                options={dropdownOptions as DropdownOption[]}
                defaultSelect={defaultDropdownSelectValue}
                onChange={handleOptionChange}
              />
            )}
          </TextInputWrapper>
        </StyledInputUniversal>
      ) : (
        <StyledInputUniversal justifylabel={justifyLabel} customwidth={width}>
          {displayLabelType === 'top' && (
            <StyledLabel isfocus={isFocused}>{label}</StyledLabel>
          )}
          <TextInputWrapper>
            {justifyLabel === 'left' && displayLabelType === 'inline' && (
              <InputLabel>{label}</InputLabel>
            )}
            <StyledInput
              // eslint-disable-next-line @typescript-eslint/ban-types
              {...(other as StyledComponentProps<'input', any, {}, never>)}
              ref={inputRef}
              displayside={justifyValue}
              type={type}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {justifyLabel === 'right' && displayLabelType === 'inline' && (
              <InputLabel>{label}</InputLabel>
            )}
          </TextInputWrapper>
        </StyledInputUniversal>
      )}
    </>
  );
};

interface DropdownInputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    'onChange' | 'ref'
  > {
  label?: string;
  justifyLabel?: 'left' | 'right';
  width?: string | number;
  options: DropdownOption[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  defaultSelect?: string;
}

export const DropdownInput = (props: DropdownInputProps): JSX.Element => {
  const {
    options,
    onChange,
    defaultSelect,
    label,
    justifyLabel = 'left',
    width,
    onFocus,
    onBlur,
    ...other
  } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>): void => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>): void => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <StyledInputUniversal justifylabel={justifyLabel} customwidth={width}>
      <StyledLabel isfocus={isFocused}>{label}</StyledLabel>
      <Dropdown
        {...other}
        options={options}
        onChange={onChange}
        defaultSelect={defaultSelect}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </StyledInputUniversal>
  );
};

const SelectGridDiv = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
`;

const SelectGridItem = styled.div`
  min-height: 32px;
  min-width: 64px;
  background-color: #e7e7e7;
  padding: 6px 20px;
  border-radius: 10px;
  margin: 4px;
  :hover {
    cursor: pointer;
  }
`;

export interface ItemJSXRequiredProps {
  key: string;
  value: string;
  label: string;
}

interface SelectGridItemProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'onClick'
  > {
  options: DropdownOption[];
  onClick?: React.ChangeEventHandler<HTMLSelectElement>;
  itemStyle?: React.CSSProperties;
  ItemJSX?: (props: ItemJSXRequiredProps) => JSX.Element;
  displayType?: 'Grid' | 'Flex';
}

export const SelectGrid = (props: SelectGridItemProps): JSX.Element => {
  const {
    options,
    onClick,
    itemStyle,
    ItemJSX,
    displayType = 'Flex',
    style,
  } = props;

  return (
    <SelectGridDiv style={style}>
      {ItemJSX
        ? options?.map(({ value, label }) => {
            return <ItemJSX key={value} value={value} label={label} />;
          })
        : options?.map(({ value, label }) => {
            return <SelectGridItem key={value}>{label}</SelectGridItem>;
          })}
    </SelectGridDiv>
  );
};

const RecentSelectWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 25px;
`;

interface RecentSelectProps {
  options: DropdownOption[];
  label?: string;
  onClick?: React.ChangeEventHandler<HTMLSelectElement>;
}

export const RecentSelectItems = (props: RecentSelectProps): JSX.Element => {
  const { label = 'Your Recently Selected Items', options, ...other } = props;

  return (
    <RecentSelectWrapper>
      <StyledLabel style={{ color: 'rgba(0,0,0,0.3)' }}>{label}</StyledLabel>
      <SelectGrid options={options} {...other} />
    </RecentSelectWrapper>
  );
};
