import { createTestClient } from 'apollo-server-testing';
import { ApolloServerBase, gql } from 'apollo-server-core';
import { UserResolver } from '../resolvers/UserResolver';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
const randomDecimalNb = Math.random();
const randomNumber = Math.round(randomDecimalNb*1000);
const email =  `testEmail${randomNumber}@gmail.com`;

const UPDATE_USER_PROFILE_DATA = gql`
  mutation{
    updateUserProfilData(data: { user: {email: testEmail${randomNumber}@gmail.com, nickname: Claudiu2 } ) {
      user {
        email
        nickname
      }
    }
  }
`;

let apollo: ApolloServerBase;

describe('Profile Mutation, email updated  with GraphQL - Test', () => {
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
      resolvers: [UserResolver],
    });

    apollo = new ApolloServer({ schema, playground: true });
  });

  afterAll(async () => {
    await mongoose.disconnect().then(() => console.log('Succesfully disconnect from database'));
  });

  it('Should returner an updated profile user from the DB', async () => {
    const { mutate } = createTestClient(apollo);

    const result = await mutate({ mutation: UPDATE_USER_PROFILE_DATA });

    expect(result.data.updateUserProfilData.email).toEqual(email);
  });
});
