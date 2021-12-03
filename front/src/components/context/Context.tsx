import React from "react";

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
  updateUser: (data: User) => void;
  APICallDone: boolean;
  updateAPICallDone: () => void;
}>({
  user: null,
  logUser: () => {
    return Promise.resolve(undefined);
  },
  updateUser: () => {},
  APICallDone: false,
  updateAPICallDone: () => {},
});

export default Context;
