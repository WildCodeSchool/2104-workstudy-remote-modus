/* eslint-disable @typescript-eslint/ban-types */
import React, { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { ApolloClient, ApolloConsumer } from "@apollo/client";
import Context from "../../components/context/Context";

const Logout: React.FC = () => {
  const { updateUser, setIsTokenChecked } = useContext(Context);

  const logoutUser = async (client: ApolloClient<object>) => {
    localStorage.clear();
    client.clearStore();
    updateUser(null);
    setIsTokenChecked(false);
    toast("A bientôt!");
  };

  return (
    <ApolloConsumer>
      {(client) => (
        <NavDropdown.Item onClick={() => logoutUser(client)}>
          Déconnexion
        </NavDropdown.Item>
      )}
    </ApolloConsumer>
  );
};

export default Logout;
