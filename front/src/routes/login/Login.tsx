/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LOGIN = gql`
  mutation login($input: AuthLoginInput!) {
    login(input: $input) {
      token
      user {
        nickname
      }
    }
  }
`;

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Format invalide")
    .required("Une adresse email est requise"),
  password: Yup.string().required("Un mot de passe est requis"),
});

const Login: React.FC = () => {
  const [login, { data }] = useMutation(LOGIN);
  const [error, setError] = useState("");

  if (data) {
    localStorage.setItem("token", data.login.token);
  }

  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const formData = {
              email: values.email,
              password: values.password,
            };
            JSON.stringify(formData);
            await login({ variables: { input: formData } });
            setSubmitting(false);
          } catch (err) {
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

          <button type="submit">Submit</button>
          {error || null}
        </Form>
      </Formik>
    </>
  );
};

export default Login;
