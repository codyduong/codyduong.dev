import styled from 'styled-components';

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  color: ${(props) => props.theme.contentEmphasized};
`;

export default Button;
