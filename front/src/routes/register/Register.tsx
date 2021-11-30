/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const REGISTER = gql`
  mutation register($input: AuthRegisterInput!) {
    register(input: $input) {
      user {
        nickname
        email
      }
      token
    }
  }
`;

const RegisterSchema = Yup.object({
  email: Yup.string()
    .email("Format invalid")
    .required("Une adresse email est requise"),
  password: Yup.string().required("Un mot de passe est requis"),
  nickname: Yup.string().required("Un pseudonyme est requis"),
});

const Register: React.FC = () => {
  const [errorState, setErrorState] = useState("");
  const initialValues = {
    nickname: "",
    email: "",
    password: "",
  };


  const [register, { data, error }] = useMutation(REGISTER, {
    errorPolicy: "all",
  });

  useEffect(() => {
    console.log("data >> ", data);
  }, [data]);

  useEffect(() => {
    if (error) setErrorState(error?.graphQLErrors[0].message);
  }, [error, errorState]);

  return (
    <div>
      <Card>
        <Card.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={async (values) => {
              const { email, password, nickname } = values;
              const formData = {
                email,
                password,
                nickname,
              };
              JSON.stringify(formData);
              register({ variables: { input: formData } });
            }}
          >
            <Form className="login-form">
              <label htmlFor="email">Adresse Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" />

              <label htmlFor="text">Pseudonyme</label>
              <Field name="nickname" type="text" />
              <ErrorMessage name="nickname" />

              <label htmlFor="password">Mot de passe</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" />

              <button
                type="submit"
              >
                Submit
              </button>
            </Form>
          </Formik>
          {errorState && <p>{errorState}</p>}
          <Link to="/login">
            <button type="button">Pas de compte ? Inscrivez vous</button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;