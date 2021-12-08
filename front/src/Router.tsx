/* eslint-disable no-console */
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
import Loading from "./components/loader/Loader";
import UpdateUserProfile from "./routes/updateUserProfile/UpdateUserProfile";
import Post from "./routes/post/Post";

const WHOAMI = gql`
  query {
    whoAmI {
      user {
        _id
        nickname
        email
      }
    }
  }
`;

function Router(): JSX.Element {
  const { updateUser } = useContext(Context);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [whoAmI, { data: whoAmiData, error: whoAmiError }] = useLazyQuery(
    WHOAMI,
    {
      errorPolicy: "all",
    }
  );

  useEffect(() => {
    if (!isTokenChecked) {
      whoAmI();
    }
  }, [whoAmI, isTokenChecked]);

  useEffect(() => {
    if (whoAmiData || whoAmiError) {
      if (whoAmiData?.whoAmI.user) {
        updateUser(whoAmiData.whoAmI.user);
      }
      setIsTokenChecked(true);
    }
  }, [updateUser, whoAmiData, whoAmiError]);

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
            <AskingHelpForm />
          </AuthRoute>
          <AuthRoute path="/profileUpdate" type="private">
            <Navbar />
            <UpdateUserProfile />
          </AuthRoute>
          <AuthRoute path="/post/:id" type="private">
            <Navbar />
            <Post />
          </AuthRoute>
        </Switch>
      </Container>
    </BrowserRouter>
  ) : (
    <Loading />
  );
}
export default Router;
