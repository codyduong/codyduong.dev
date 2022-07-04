import styled from 'styled-components';

// export const Form = styled.form``;
// export const Label = styled.label``;
// export const Input = styled.input``;
// export const FormButton = styled.button``;
export const Select = styled.select`
  //Disable default appearance
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-size: 1rem;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0.5rem;
  padding-bottom: calc(0.5rem + 1px);
  &:hover {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #000000;
    cursor: pointer;
  }
  &:focus {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #3f51b5;
  }
`;
