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

  const [login, { data }] = useMutation(LOGIN);
  const [user, setUser] = useState<User>(null);
  const token = localStorage.getItem("jwt");
  const [isTokenChecked, setIsTokenChecked] = useState<boolean>(false);

  const logUser = async (userCredentials: UserCredentials) => {
    try {
      login({ variables: { input: userCredentials } });
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
    // TODO: Recuperer whoAmI et virer le user
    if (token) {
      setUser({ _id: "1", email: "toto@gmail.com", nickname: "toto" });
    }
    console.log("J'ai checké le token");
    setIsTokenChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Attendre qu'on ai vérifié la présence d'un token et la co d'un user et
    // avant de rendre BrowserRouter
    isTokenChecked ? (
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
    ) : (
      <div>Toto</div>
    )
  );
}
export default Router;
