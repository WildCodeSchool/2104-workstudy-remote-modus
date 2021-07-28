import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-core';
import { PostResolver } from '../PostResolver';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { MongoMemoryServer  } from "mongodb-memory-server"
import mongoose from 'mongoose';

const CREATE_POST = gql`  
  mutation {
  addPost(
    data:{
    title: "Ceci est un test"
    wysiwyg: "<p> Test </p>"
    skills: [{value: "node"}]
  }){title}
}`;

let apollo: any;


describe('Post Mutation test on with GraphQL', () => {
  beforeAll(async () => {
    const mongo :MongoMemoryServer  =  await MongoMemoryServer.create();
    const uri = mongo.getUri();
    mongoose
      .connect(uri, {
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

    expect(result.data.addPost.title).toEqual("Ceci est un test");
  });
});
