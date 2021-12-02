import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import Context from "./components/context/Context";

interface Props extends RouteProps {
  type: string;
}

const AuthRoute = (props: Props) => {
  const { user } = useContext(Context);
  const { type } = props;

  if (type === "guest" && user) {
    console.log("Je redirige vers la home");

    return <Redirect to="/AskingHelpForm" />;
  }
  if (type === "private" && !user) {
    console.log("Je redirige vers login");
    return <Redirect to="/" />;
  }
  console.log("J'affiche la page demandée");
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props} />;
};

export default AuthRoute;
