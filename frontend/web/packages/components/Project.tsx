import React from 'react';
import styled from 'styled-components';
import T from './Typography';

const StyledDiv = styled.div`
  box-sizing: border-box;
  width: 39ch;
  height: 20ch;
  border: 2px solid ${({ theme }) => theme.color.surface[300]};
  padding: 1rem;
  border-radius: 1rem;
  flex-grow: 1;
`;

interface ProjectProps {
  title: React.ReactNode;
  desc: React.ReactNode;
  badges: React.ReactNode;
}

const Project = (props: ProjectProps): JSX.Element => {
  const { title, desc, badges } = props;

  return (
    <StyledDiv>
      <T.H4>{title}</T.H4>
      <span>{desc}</span>
      {badges}
    </StyledDiv>
  );
};

export default Project;
