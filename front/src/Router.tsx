import React, { useEffect, useState } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  useMutation,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./routes/home/Home";
import Context, { User, UserCredentials } from "./components/context/Context";
import Login from "./routes/login/Login";
import AskingHelpForm from "./routes/askingHelpForm/AskingHelpForm";

function Router(): JSX.Element {
  // const httpLink = createHttpLink({
  //   uri:
  //     process.env.NODE_ENV === "production"
  //       ? "/graphql"
  //       : process.env.REACT_APP_API_DEV,
  // });

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

  // const authLink = setContext((_, { headers }) => {
  //   const token = localStorage.getItem("token");
  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: token,
  //     },
  //   };
  // });

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [login, { data }] = useMutation(LOGIN);
  const [user, setUser] = useState<User>(null);

  const logUser = async (userCredentials: UserCredentials) => {
    try {
      console.log("userCredentials", userCredentials);
      await login({ variables: { input: userCredentials } });
    } catch (err: any) {
      console.log("err.message :>> ", err.message);
    }
  };

  useEffect(() => {
    const isValidToken = localStorage.getItem("token");
    setIsLogin(!!isValidToken);
  }, [isLogin]);

  useEffect(() => {
    if (data?.login.user) {
      localStorage.setItem("jwt", JSON.stringify(data.login.token));
      setUser(data.login.user);
    }
  }, [data]);

  console.log("user", user);

  return (
    <BrowserRouter>
      <Context.Provider value={{ user, isLogin, setIsLogin, logUser }}>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          {/* <Route exact path="/register">
        				<Register />
      				</Route> */}
          <Route exact path="/">
            <Home />
          </Route>
          {/* <Route exact path="/asking-help-form" >
              <AskingHelpForm />
            </Route> */}
        </Switch>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default Router;
