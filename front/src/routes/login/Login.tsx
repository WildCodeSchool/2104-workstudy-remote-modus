import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Card, Form as FormBS } from "react-bootstrap";
import { Link } from "react-router-dom";
import Context from "../../components/context/Context";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Format invalide")
    .required("Une adresse email est requise"),
  password: Yup.string().required("Un mot de passe est requis"),
});

const Login: React.FC = () => {
  const { logUser } = useContext(Context);

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="container-form">
      <div className="mb-4 d-flex justify-content-center">
        <img
          className="w-50"
          src="https://res.cloudinary.com/dykscnyvu/image/upload/v1627564833/Moddusey/logo1_nhaokq.png"
          alt="Logo"
        />
      </div>
      <Card className="border rounded border-warning bg-transparent p-4">
        <Card.Title className="text-center">Se connecter</Card.Title>
        <Card.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              const { email, password } = values;
              const formData = {
                email,
                password,
              };
              JSON.stringify(formData);
              await logUser(formData);
            }}
          >
            <Form className="login-form d-flex flex-column">
              <FormBS.Group className="mb-4 errorMessage">
                <Field
                  className="form-control"
                  placeholder="Adresse mail"
                  name="email"
                  type="email"
                />
                <ErrorMessage name="email" />
              </FormBS.Group>

              <FormBS.Group className="mb-4 errorMessage">
                <Field
                  className="form-control"
                  name="password"
                  placeholder="Mot de passe"
                  type="password"
                />
                <ErrorMessage name="password" />
              </FormBS.Group>
              <div className="d-flex justify-content-center">
                <Button variant="classic" className="w-50 mb-4" type="submit">
                  Connexion
                </Button>
              </div>
            </Form>
          </Formik>

          <Link to="/inscription">
            <p className="text-center text-white">
              Vous n&apos;avez pas de compte ? Inscrivez vous
            </p>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
