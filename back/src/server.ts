import { PostResolver } from './resolvers/PostResolver';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './resolvers/AuthResolver';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const server = async () => {
  const schema = await buildSchema({
    resolvers: [PostResolver, AuthResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
  });

  const { url } = await apolloServer.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
};

export default server;
