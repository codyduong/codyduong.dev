import styled from 'styled-components';
import T from 'packages/components/Typography';
import { Link } from 'packages/components/A';
import Section from 'packages/components/Section';

const NotFoundSection = styled(Section)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
`;

const PostNotFound = (_: Record<never, unknown>): JSX.Element => {
  return (
    <NotFoundSection>
      <T.H1>Post was not found</T.H1>
      <Link.Styled to="/posts">Go back</Link.Styled>
    </NotFoundSection>
  );
};

export default PostNotFound;
