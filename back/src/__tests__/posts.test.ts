import { ApolloServerBase, gql } from 'apollo-server-core';
import { PostResolver } from '../resolvers/PostResolver';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const ADD_POST<DocumentNode> = gql`
  mutation AddPost($input: inputAddPost!) {
    addPost(data: $input) {
      title
      wysiwyg
      skills {
        value
      }
    }
  }
`;

let apollo: ApolloServerBase;

describe('Post Mutation test on with GraphQL', () => {
  beforeAll(async () => {
    const mongo: MongoMemoryServer = await MongoMemoryServer.create();
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

    apollo = new ApolloServer({ schema });
  });

  afterAll(async () => {
    await mongoose.disconnect().then(() => console.log('Succesfully disconnect from database'));
  });

  it('Should list something from the DB', async () => {

    const result = await apollo.executeOperation({
       query: ADD_POST,
       variables : { input: { 
         title: "Je créer un post",
         wysiwyg:"<h1> Je suis un Test </h1>",
         skills:[{ "value": "ANG" }]
      }} 
    });
    console.log('result :>> ', result);
    expect(result?.data.addPost.title).toEqual('Je créer un post');
  });
});
