/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from 'src/types/MyContext';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  console.log('Context >>>', context.req);
  if (!context.req) {
    throw new Error('not authenticated');
  }
  return next();
};
