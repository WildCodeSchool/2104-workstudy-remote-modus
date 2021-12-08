import { Request } from 'express';

export interface MyContext {
  req: Request;
}

export interface CtxUserId {
  userId: string;
  _extensionStack: unknown;
}
