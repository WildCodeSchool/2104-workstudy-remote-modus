import React from "react";

export type User = null | {
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
  logoutUser?: () => Promise<void>;
}>({
  user: null,
  logUser: () => {
    return Promise.resolve(undefined);
  },
  updateUser: () => {
    console.log("updateUser not set");
  },
});

export default Context;
