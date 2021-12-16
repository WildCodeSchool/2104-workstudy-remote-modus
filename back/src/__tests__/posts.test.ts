import { gql } from 'apollo-server-core';
import { PostResolver } from '../resolvers/PostResolver';
import { AuthResolver } from '../resolvers/AuthResolver';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const ADD_POST = gql`
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
const REGISTER = gql`
  mutation register($input: AuthRegisterInput!) {
    register(input: $input) {
      user {
        nickname
        email
      }
      token
    }
  }
`;
const LOGIN = gql`
  mutation login($input: AuthLoginInput!) {
    login(input: $input) {
      token
      user {
        email
        nickname
        _id
      }
    }
  }
`;

let apollo: ApolloServer;

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
      resolvers: [PostResolver, AuthResolver],
    });

    apollo = new ApolloServer({ schema });
  });

  afterAll(async () => {
    await mongoose.disconnect().then(() => console.log('Succesfully disconnect from database'));
  });

  it('Create an User, log with it then create a post', async () => {
    const resultRegister = await apollo.executeOperation({
      query: REGISTER,
      variables: {
        input: {
          email: 'test@wcs.com',
          password: 'test',
          nickname: 'TESTEUR',
        },
      },
    });

    expect(resultRegister?.errors).toBeUndefined();
    expect(resultRegister?.data?.register.user).toBeDefined();
    expect(resultRegister?.data?.register.user.email).toEqual('test@wcs.com');
    expect(resultRegister?.data?.register.user.nickname).toEqual('TESTEUR');
    expect(resultRegister?.data?.register.token).toBeDefined();

    if (resultRegister.data !== null) {
      const resultLogin = await apollo.executeOperation({
        query: LOGIN,
        variables: {
          input: {
            email: 'test@wcs.com',
            password: 'test',
          },
        },
      });

      expect(resultLogin?.errors).toBeUndefined();
      expect(resultLogin?.data?.login.user).toBeDefined();
      expect(resultLogin?.data?.login.user.email).toEqual('test@wcs.com');
      expect(resultLogin?.data?.login.user.nickname).toEqual('TESTEUR');
      expect(resultLogin?.data?.login.user._id).toBeDefined();
      expect(resultLogin?.data?.login.token).toBeDefined();

      if (resultLogin.data !== null) {
        const schema = await buildSchema({
          resolvers: [PostResolver],
        });

        const newApollo = new ApolloServer({
          schema,
          context: () => {
            const token = resultLogin?.data?.login.token;
            try {
              const payload = jwt.verify(token, 'testuntilweputdotenv');
              if (typeof payload !== 'string') {
                return { userId: payload.userId };
              }
              return;
            } catch (err) {
              throw new Error(`Error: ${err}`);
            }
          },
        });

        const resultAddPost = await newApollo.executeOperation({
          query: ADD_POST,
          variables: {
            input: {
              title: 'Je créer un post',
              wysiwyg: '<h1> Je suis un Test </h1>',
              skills: [{ value: 'ANG' }],
            },
          },
        });

        expect(resultAddPost?.errors).toBeUndefined();
        expect(resultAddPost?.data?.addPost.title).toEqual('Je créer un post');
        expect(resultAddPost?.data?.addPost.wysiwyg).toEqual('<h1> Je suis un Test </h1>');
        expect(resultAddPost?.data?.addPost.skills).toHaveLength(1);
      }
    }
  });
});
