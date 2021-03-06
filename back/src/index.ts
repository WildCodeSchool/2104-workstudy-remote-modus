import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { AuthResolver } from './resolvers/AuthResolver';
import { UserResolver } from './resolvers/UserResolver';
import { PostResolver } from './resolvers/PostResolver';
import { SkillResolver } from './resolvers/SkillResolver';

import cors from 'cors';
import jwt from 'jsonwebtoken';
import { MyContext } from './types/MyContext';

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
    resolvers: [UserResolver, PostResolver, AuthResolver, SkillResolver],
    authChecker: ({ context: { req } }) => req,
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    context: ({ req }: MyContext) => {
      if (req.headers) {
        const token = req.headers.authorization?.split(' ');
        if (token) {
          try {
            const isValid = jwt.verify(token[1], 'testuntilweputdotenv');
            if (typeof isValid !== 'string') return { userId: isValid.userId };
          } catch (err) {
            console.log('Error encountered :', err);
          }
        }
      }
      return req;
    },
  });

  const app = express();

  app.use(graphqlUploadExpress());

  app.use(cors());

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`));
}

start();
