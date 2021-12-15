/* eslint-disable no-console */
import React, { useContext, useEffect } from "react";
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
  const { updateUser, isTokenChecked, setIsTokenChecked } = useContext(Context);
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
  }, [setIsTokenChecked, updateUser, whoAmiData, whoAmiError]);

  return isTokenChecked ? (
    <BrowserRouter>
      <Container fluid className="layout">
        <Switch>
          <AuthRoute exact path="/" type="guest">
            <Login />
          </AuthRoute>
          <AuthRoute path="/inscription" type="guest">
            <Register />
          </AuthRoute>
          <AuthRoute exact path="/aides/:id" type="private">
            <Navbar />
            <Post />
          </AuthRoute>
          <AuthRoute exact path="/aides" type="private">
            <Navbar />
            <AskingHelpPosts />
          </AuthRoute>
          <AuthRoute path="/formulaire" type="private">
            <Navbar />
            <AskingHelpForm />
          </AuthRoute>
          <AuthRoute path="/parametres" type="private">
            <Navbar />
            <UpdateUserProfile />
          </AuthRoute>
        </Switch>
      </Container>
    </BrowserRouter>
  ) : (
    <Loading />
  );
}
export default Router;
