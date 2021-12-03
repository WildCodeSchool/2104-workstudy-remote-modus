import React, { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { BrowserRouter, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Context, { User, UserCredentials } from "./components/context/Context";
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
import AuthRoute from "./AuthRoute";
import AskingHelpPosts from "./routes/askingHelpPosts/AskingHelpPosts";
import AskingHelpForm from "./routes/askingHelpForm/AskingHelpForm";
import Navbar from "./components/navbar/Navbar";

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

function Router(): JSX.Element {
  const [login, { data: loginData }] = useMutation(LOGIN);
  const [APICallDone, setAPICallDone] = useState(false);
  const [user, setUser] = useState<User>(null);
  const updateUser = (data: User) => {
    if (data) {
      setUser(data);
    }
  };

  const updateAPICallDone = () => {
    setAPICallDone(true);
  };

  const logUser = async (userCredentials: UserCredentials) => {
    try {
      await login({ variables: { input: userCredentials } });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log("err.message :>> ", err.message);
    }
  };

  useEffect(() => {
    if (loginData?.login.user && setUser) {
      localStorage.setItem("jwt", JSON.stringify(loginData.login.token));
      setUser(loginData.login.user);
    }
  }, [loginData, setUser]);

  return (
    <BrowserRouter>
      <Container fluid className="layout">
        <Context.Provider
          value={{
            user,
            updateAPICallDone,
            APICallDone,
            updateUser,
            logUser,
          }}
        >
          <Switch>
            <AuthRoute exact path="/" type="guest">
              <Login />
            </AuthRoute>
            <AuthRoute path="/register" type="guest">
              <Register />
            </AuthRoute>
            <AuthRoute path="/AskingHelpPosts" type="private">
              <Navbar />
              <AskingHelpPosts />
            </AuthRoute>
            <AuthRoute path="/AskingHelpForm" type="private">
              <Navbar />
              <AskingHelpForm onSubmit={() => console.log()} />
            </AuthRoute>
          </Switch>
        </Context.Provider>
      </Container>
    </BrowserRouter>
  );
}
export default Router;
