import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { context } from './context';

schema().then((result) => {
  const server = new ApolloServer({
    schema: result,
    context: context,
  });

  server.listen().then(async ({ url }) => {
    console.log(`\
  🚀 Server ready at: ${url}
  ⭐️ See sample queries: http://pris.ly/e/ts/graphql-nexus#using-the-graphql-api
    `);
  });
});
