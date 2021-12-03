import { MiddlewareFn } from 'type-graphql';
import { CtxUserId } from 'src/types/MyContext';

export const isAuth: MiddlewareFn<CtxUserId> = async ({ context }, next) => {
  const { userId } = context;
  console.log('ctx isAuth', userId);

  if (!userId) {
    throw new Error('not authenticated');
  }

  return next();
};
