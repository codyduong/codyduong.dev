import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import color from 'color';

const SearchDiv = styled.div`
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px 16px;

  height: 58px;
  max-height: 58px;

  /* inferna-color-text-400 */
  border-bottom: 1px solid ${({ theme }) => theme.color.text[400]};

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;

  transition: padding 0.225s, max-height 0.225s;
  &.searching {
    padding-top: 16px;
    max-height: 66px;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;

  max-width: calc(${({ theme }) => theme.spacing.rem[1000]} * 4);

  /* inferna-color-surface-400 */
  background: ${({ theme }) => theme.color.surface[400]};
  box-shadow: 0px 1px 4px rgba(255, 255, 255, 0.36);
  border-radius: 8px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;

  box-sizing: border-box;
  border: 1px outset transparent;
  transition: border 0.225s, box-shadow 0.225s;
  &.focused {
    border: 1px outset ${({ theme }) => theme.color.base[300]};
    box-shadow: 0px 1px 6px ${({ theme }) => theme.color.base[300]};
  }
`;

const SearchButton = styled.button<{ order?: number }>`
  all: unset;
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  order: ${({ order }) => order};
  transition: color 0.225s;

  &.clearable {
    color: ${({ theme }) => theme.color.text[200]};
  }
`;

const SearchInput = styled.input`
  all: unset;
  color: ${({ theme }) => theme.color.text[100]};
  flex-grow: 1;
`;

interface SearchProps {
  searching: boolean;
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
}

const Search = ({
  searching,
  setSearching,
  value,
  setValue,
  open,
}: SearchProps): JSX.Element => {
  // const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    open && value && setValue('');
  }, [open]);

  useEffect(() => {
    setSearching(!!value || focused);
  }, [value, focused]);

  const searchDivClassnames = classnames({
    ['searching']: searching,
  });

  const searchClassnames = classnames({
    ['focused']: searching,
  });

  const clearSearchClassNames = classnames({
    ['clearable']: value,
  });

  return (
    <SearchDiv className={searchDivClassnames}>
      <SearchWrapper className={searchClassnames}>
        <SearchInput
          ref={searchRef}
          aria-label="Search codyduong.dev"
          placeholder="search codyduong.dev"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          tabIndex={open ? undefined : -1}
        />
        <SearchButton
          type="submit"
          aria-label="Submit Search"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          tabIndex={open ? undefined : -1}
        >
          <SearchIcon />
        </SearchButton>
        <SearchButton
          type="reset"
          aria-label="Clear Search"
          order={-1}
          className={clearSearchClassNames}
          onClick={() => {
            setValue('');
            searchRef.current?.focus();
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          tabIndex={open ? undefined : -1}
        >
          <BackspaceOutlinedIcon />
        </SearchButton>
      </SearchWrapper>
    </SearchDiv>
  );
};

export default Search;
