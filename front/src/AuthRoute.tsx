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
    return <Redirect to="/AskingHelpForm" />;
  }
  if (type === "private" && !user) {
    return <Redirect to="/" />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props} />;
};

export default AuthRoute;
