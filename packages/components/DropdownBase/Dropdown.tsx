import React, { useState } from 'react';
import { Select } from '../styled/Form';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps
  extends Omit<
    React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    'onChange' | 'ref'
  > {
  defaultSelect?: string;
  options: DropdownOption[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const Dropdown = (props: DropdownProps): JSX.Element => {
  const { options, onChange, defaultSelect, ...other } = props;

  const [value, setValue] = useState(defaultSelect);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange?.(e);
    setValue(e.target.value);
  };

  const children: JSX.Element[] = options.map((object) => {
    return (
      <option key={`dropdown${object.value}`} value={object.value}>
        {object.label}
      </option>
    );
  });

  return (
    <Select {...other} value={value} onChange={(e): void => handleChange(e)}>
      {children}
    </Select>
  );
};

export default Dropdown;
