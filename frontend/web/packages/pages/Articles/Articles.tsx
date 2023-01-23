import { gql, useQuery } from '@apollo/client';
import Content from 'packages/components/Content';
import Section from 'packages/components/Section';
import T from 'packages/components/Typography';

const Articles = (): JSX.Element => {
  const { data } = useQuery(gql`
    query Query {
      articles {
        content
      }
    }
  `);

  return (
    <Content>
      <Section>
        <T.H1>articles</T.H1>
        <T.P2>Welcome to the place I dump ideas and opinions</T.P2>
        <T.P2>This page is still under construction</T.P2>
        {JSON.stringify(data)}
      </Section>
    </Content>
  );
};

export default Articles;
