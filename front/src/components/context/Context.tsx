import { gql, useMutation } from "@apollo/client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export type User = null | {
  __typename: string;
  _id: string;
  nickname: string;
  email: string;
  password: string;
};

export type UserCredentials = {
  password: string;
  email: string;
};

const Context = React.createContext<{
  user: User;
  logUser: (userCredentials: UserCredentials) => Promise<void>;
  isLogin?: boolean;
  setIsLogin?: Dispatch<SetStateAction<boolean>>;
}>({
  user: null,
  logUser: () => {
    return Promise.resolve(undefined);
  },
});

export default Context;
