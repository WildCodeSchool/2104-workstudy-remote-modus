/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildSchema } from 'type-graphql';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { AuthResolver } from './resolvers/AuthResolver';
import { UserResolver } from './resolvers/UserResolver';
import { PostResolver } from './resolvers/PostResolver';
// import jwt from 'jsonwebtoken';
// import { User, UserModel } from './models/User';

import cors from "cors"

async function start() {
  mongoose
    .connect('mongodb://mongodb:27017/modussey', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    })
    .then(() => console.log('Connected to database'))

    .catch((err: Error) => console.log(err));

  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver, AuthResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.session;
    },
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req }),
    playground: true,
  });

  const app = express();

  app.use(graphqlUploadExpress());
  app.use(cors());
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`));

}

start();
