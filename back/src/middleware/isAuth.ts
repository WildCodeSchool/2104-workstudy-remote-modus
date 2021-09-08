/* eslint-disable prefer-const */
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from 'src/types/MyContext';
import jwt from 'jsonwebtoken';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  let token;
  console.log('headers sa race', context.req.headers.authorization)

  if (!context.req.headers.authorization) {
    throw new Error('not authenticated');
  }

  token = context.req.headers.authorization.split(' ');

  const isValid = jwt.verify(token[1], 'testuntilweputdotenv')
  
  if(!isValid) return false;
  
  return next();
};
