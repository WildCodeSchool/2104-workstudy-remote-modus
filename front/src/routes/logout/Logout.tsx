import React, { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Context from "../../components/context/Context";

const Logout: React.FC = () => {
  const history = useHistory();
  const { updateUser } = useContext(Context);

  const logoutUser = async () => {
    updateUser(null);
    localStorage.clear();
    history.push("/AskingHelpPosts");
  };

  return (
    <NavDropdown.Item onClick={() => logoutUser()}>
      Déconnexion
    </NavDropdown.Item>
  );
};

export default Logout;
