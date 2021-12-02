import React, { useEffect, useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { BrowserRouter, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Context, { User, UserCredentials } from "./components/context/Context";
import Login from "./routes/login/Login";
import AuthRoute from "./AuthRoute";
import AskingHelpPosts from "./routes/askingHelpPosts/AskingHelpPosts";
import AskingHelpForm from "./routes/askingHelpForm/AskingHelpForm";
import Register from "./routes/register/Register";
import Navbar from "./components/navbar/Navbar";

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
    query whoAmI {
      user {
        email
        nickname
        _id
      }
    }
  `;

  const [login, { data: mutationData }] = useMutation(LOGIN);
  const { data } = useQuery(WHOAMI);
  const [user, setUser] = useState<User>(null);
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
    if (mutationData?.login.user) {
      localStorage.setItem("jwt", JSON.stringify(mutationData.login.token));
      setUser(mutationData.login.user);
    }
  }, [mutationData]);

  useEffect(() => {
    console.log(data);
    setIsTokenChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Attendre qu'on ai vérifié la présence d'un token et la co d'un user et
    // avant de rendre BrowserRouter
    isTokenChecked ? (
      <BrowserRouter>
        <Container fluid className="layout">
          <Context.Provider value={{ user, logUser }}>
            <Switch>
              <AuthRoute path="/login" type="guest">
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
                <AskingHelpForm onSubmit={() => console.log(data)} />
              </AuthRoute>
            </Switch>
          </Context.Provider>
        </Container>
      </BrowserRouter>
    ) : (
      <div>Toto</div>
    )
  );
}
export default Router;
