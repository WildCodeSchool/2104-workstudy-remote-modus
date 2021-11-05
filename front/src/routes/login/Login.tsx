/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from "react";
// import { gql } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Context from "../../components/context/Context";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Format invalid")
    .required("Une adresse email est requise"),
  password: Yup.string().required("Un mot de passe est requis"),
});

const Login: React.FC = () => {
  const { logUser, user } = useContext(Context);
  const [error, setError] = useState("");
  const initialValues = {
    email: "",
    password: "",
  };

  const history = useHistory();
  return (
    <div>
      <Card>
        <Card.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              try {
                const formData = {
                  email: values.email,
                  password: values.password,
                };
                JSON.stringify(formData);
                await logUser(formData);
              } catch (err: any) {
                setError(err.message);
              }
            }}
          >
            <Form className="login-form">
              <label htmlFor="email">Mail Address</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" />

              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" />

              <button
                type="submit"
                onClick={() => {
                  history.push("/");
                }}
              >
                Submit
              </button>
            </Form>
          </Formik>

          <Link to="/register">
            <button type="button">Pas de compte ? Inscrivez vous</button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
