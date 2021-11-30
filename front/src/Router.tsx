import React, { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./routes/home/Home";
import Context, { User, UserCredentials } from "./components/context/Context";
import Login from "./routes/login/Login";

function Router(): JSX.Element {
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

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [login, { data }] = useMutation(LOGIN);
  const [user, setUser] = useState<User>(null);

  const logUser = async (userCredentials: UserCredentials) => {
    try {
      // eslint-disable-next-line no-console
      console.log("userCredentials", userCredentials);
      await login({ variables: { input: userCredentials } });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log("err.message :>> ", err.message);
    }
  };

  useEffect(() => {
    if (data?.login.user) {
      localStorage.setItem("jwt", JSON.stringify(data.login.token));
      setUser(data.login.user);
    }
  }, [data]);

  useEffect(() => {
    const isValidToken = localStorage.getItem("jwt");
    setIsLogin(!!isValidToken);
  }, [isLogin]);

  // eslint-disable-next-line no-console
  console.log(isLogin);

  return (
    <BrowserRouter>
      <Context.Provider value={{ user, isLogin, setIsLogin, logUser }}>
        <Switch>
          {isLogin ? (
            <Route exact path="/">
              <Home />
            </Route>
          ) : (
            <>
              <Redirect to="/login" />
              <Route exact path="/login">
                <Login />
              </Route>
            </>
          )}
        </Switch>
      </Context.Provider>
    </BrowserRouter>
  );
}
export default Router;
