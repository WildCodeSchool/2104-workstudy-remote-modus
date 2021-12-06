import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Context, { User, UserCredentials } from "./components/context/Context";
import "react-toastify/dist/ReactToastify.css";
import Router from "./Router";

const LOGIN = gql`
  mutation login($input: AuthLoginInput!) {
    login(input: $input) {
      token
      user {
        email
        nickname
        _id
      }
    }
  }
`;

const Provider = () => {
  const [login, { data: loginData }] = useMutation(LOGIN);
  const [user, setUser] = useState<User>(null);
  const updateUser = (data: User) => {
    setUser(data);
  };

  const logUser = async (userCredentials: UserCredentials) => {
    try {
      await login({ variables: { input: userCredentials } });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log("err.message :>> ", err.message);
    }
  };

  const logoutUser = async () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    if (loginData?.login.user && setUser) {
      localStorage.setItem("jwt", JSON.stringify(loginData.login.token));
      setUser(loginData.login.user);
    }
  }, [loginData, setUser]);

  return (
    <Context.Provider
      value={{
        user,
        updateUser,
        logUser,
        logoutUser,
      }}
    >
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Context.Provider>
  );
};

export default Provider;
