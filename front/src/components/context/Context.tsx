import React, { Dispatch, SetStateAction } from "react";

export type User = null | {
  // ATTENTION on a viré __typename et password
  _id: string;
  nickname: string;
  email: string;
};

export type UserCredentials = {
  password: string;
  email: string;
};

const Context = React.createContext<{
  user: User;
  logUser: (userCredentials: UserCredentials) => Promise<void>;
}>({
  user: null,
  logUser: () => {
    return Promise.resolve(undefined);
  },
});

export default Context;
