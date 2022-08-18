import styled from 'styled-components';

export const H1 = styled.h1`
  font-family: 'Overpass';
  font-style: italic;
  font-weight: 900;
  margin: 0 0;

  /* identical to box height */
  text-align: center;

  /* inferna-color-text-500 */
  color: ${(props) => props.theme.color.text[500]};
`;
export const H2 = styled.h2``;
export const H3 = styled.h3``;
export const H4 = styled.h4``;
export const H5 = styled.h5``;
export const H6 = styled.h6``;
