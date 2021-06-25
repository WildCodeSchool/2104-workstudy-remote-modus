import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-core';
import { PostResolver } from '../PostResolver';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import mongoose from 'mongoose';

const CREATE_POST = gql`
  mutation addPost($data: { title: 'Such Title', wysiwyg: '<p> Hello World </p>', skills: [{ value: 'Node'}] }) {
      addPost(data: $data){
      title,
      }
  }
`;

let apollo: any;

describe('Post Mutation test on with GraphQL', () => {
  beforeAll(async () => {
    mongoose
      .connect('mongodb://127.0.0.1:27017/modussey', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: true,
      })

      .then(() => console.log('Connected to database'))

      .catch((err: Error) => console.log(err));

    const schema = await buildSchema({
      resolvers: [PostResolver],
    });

    apollo = new ApolloServer({ schema, playground: true });
  });

  afterAll(async () => {
    await mongoose.disconnect().then(() => console.log('Succesfully disconnect from database'));
  });

  it('Should list something from the DB', async () => {
    const { mutate } = createTestClient(apollo);

    const result = await mutate({ mutation: CREATE_POST });

    console.log(result);

    expect(result).toEqual('toto');
  });
});
