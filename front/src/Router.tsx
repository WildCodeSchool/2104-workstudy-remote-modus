import React, { useContext, useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { BrowserRouter, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Context from "./components/context/Context";
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
import AuthRoute from "./AuthRoute";
import AskingHelpPosts from "./routes/askingHelpPosts/AskingHelpPosts";
import AskingHelpForm from "./routes/askingHelpForm/AskingHelpForm";
import Navbar from "./components/navbar/Navbar";

const WHOAMI = gql`
  query {
    whoAmI {
      user {
        _id
      }
    }
  }
`;

function Router(): JSX.Element {
  const { user, updateUser } = useContext(Context);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [whoAmICall, setWhoAmICall] = useState(false);
  const [whoAmI, { data: whoAmiData, error }] = useLazyQuery(WHOAMI, {
    errorPolicy: "all",
  });

  useEffect(() => {
    if (!isTokenChecked && !whoAmICall) {
      whoAmI();
      setWhoAmICall(true);
    } else if (!isTokenChecked && whoAmICall) {
      if (whoAmiData?.whoAmI.user) {
        updateUser(whoAmiData.whoAmI.user);
      }

      setIsTokenChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whoAmI, isTokenChecked, whoAmiData, whoAmICall, user]);

  useEffect(() => {
    if (whoAmiData?.whoAmI.user) {
      updateUser(whoAmiData.whoAmI.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whoAmiData]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return isTokenChecked ? (
    <BrowserRouter>
      <Container fluid className="layout">
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
      </Container>
    </BrowserRouter>
  ) : (
    <div className="text-white">Toto</div>
  );
}
export default Router;
