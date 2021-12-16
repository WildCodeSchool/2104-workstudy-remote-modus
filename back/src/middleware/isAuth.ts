import { MiddlewareFn } from 'type-graphql';
import { CtxUserId } from 'src/types/MyContext';

export const isAuth: MiddlewareFn<CtxUserId> = async ({ context }, next) => {
  const { userId } = context;

  if (!userId) {
    throw new Error('Vous n\'êtes pas authentifié');
  }

  return next();
};
