import React, { useEffect, useState } from "react";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import { BrowserRouter, Switch } from "react-router-dom";
import Context, { User, UserCredentials } from "./components/context/Context";
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
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

  const WHOAMI = gql`
    query {
      whoAmI {
        user {
          _id
        }
      }
    }
  `;

  const [login, { data: loginData }] = useMutation(LOGIN);
  const [whoAmI, { data: whoAmiData, error }] = useLazyQuery(WHOAMI, {
    errorPolicy: "all",
  });

  const [user, setUser] = useState<User>(null);
  const [whoAmICall, setWhoAmICall] = useState(false);
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
    if (loginData?.login.user) {
      localStorage.setItem("jwt", JSON.stringify(loginData.login.token));
      setUser(loginData.login.user);
    }
  }, [loginData]);

  useEffect(() => {
    if (!isTokenChecked && !whoAmICall) {
      whoAmI();
      setWhoAmICall(true);
    } else if (!isTokenChecked) {
      if (whoAmiData?.whoAmI.user) {
        setUser(whoAmiData.whoAmI.user);
      }
      setIsTokenChecked(true);
    }
  }, [whoAmI, isTokenChecked, whoAmiData, whoAmICall]);

  return (
    // Attendre qu'on ai vérifié la présence d'un token et la co d'un user et
    // avant de rendre BrowserRouter
    isTokenChecked ? (
      <BrowserRouter>
        <Context.Provider value={{ user, logUser }}>
          <Switch>
            <AuthRoute exact path="/" type="guest">
              <Login />
            </AuthRoute>
            <AuthRoute path="/register" type="guest">
              <Register />
            </AuthRoute>
            <AuthRoute path="/AskingHelpPosts" type="private">
              <AskingHelpPosts />
            </AuthRoute>
            <AuthRoute path="/AskingHelpForm" type="private">
              <AskingHelpForm onSubmit={() => console.log(whoAmiData)} />
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
