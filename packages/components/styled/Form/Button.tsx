import styled from 'styled-components';

/** @deprecated */
const Button = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  color: ${(props) => props.theme.primary.l200};
`;

export default Button;
