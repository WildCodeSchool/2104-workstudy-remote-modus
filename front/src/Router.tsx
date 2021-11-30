import React, { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./routes/home/Home";
import Context, { User, UserCredentials } from "./components/context/Context";
import Login from "./routes/login/Login";
import AuthRoute from "./AuthRoute";
import AskingHelpPosts from "./routes/askingHelpPosts/AskingHelpPosts";
import AskingHelpForm from "./routes/askingHelpForm/AskingHelpForm";

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

  // const [isLogin, setIsLogin] = useState<boolean>(false);
  const [login, { data }] = useMutation(LOGIN);
  const [user, setUser] = useState<User>(null);

  const logUser = async (userCredentials: UserCredentials) => {
    try {
      await login({ variables: { input: userCredentials } });
      if (data?.login.user) {
        localStorage.setItem("jwt", JSON.stringify(data.login.token));
        setUser(data.login.user);
      }
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log("err.message :>> ", err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    // TODO: Recuperer whoAmI et virer le user
    if (token) {
      setUser({ _id: "1", email: "toto@gmail.com", nickname: "toto" });
      console.log("je suis dans le useeffect");
    }
  }, []);

  return (
    <BrowserRouter>
      <Context.Provider value={{ user, logUser }}>
        <Switch>
          <AuthRoute path="/login" type="guest">
            <Login />
          </AuthRoute>
          <AuthRoute path="/home" type="private">
            <Home />
          </AuthRoute>
          <AuthRoute path="/AskingHelpPosts" type="private">
            <AskingHelpPosts />
          </AuthRoute>
          <AuthRoute path="/AskingHelpForm" type="private">
            <AskingHelpForm onSubmit={() => console.log(data)} />
          </AuthRoute>
        </Switch>
      </Context.Provider>
    </BrowserRouter>
  );
}
export default Router;
