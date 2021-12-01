/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Card, Form as FormBS } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
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
  const history = useHistory();
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
    if (data) {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) setErrorState(error?.graphQLErrors[0].message);
  }, [error, errorState]);

  return (
    <div className="container-form">
      <div className="mb-4 d-flex justify-content-center">
        <img
          className="w-50"
          src="https://res.cloudinary.com/dykscnyvu/image/upload/v1627564833/Moddusey/logo1_nhaokq.png"
          alt="Logo"
        />
      </div>
      <Card className="border rounder border-warning bg-transparent p-4">
        <Card.Title className="text-center">Register</Card.Title>
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
            <Form className="login-form d-flex flex-column">
              <FormBS.Group className="mb-4">
                <Field
                  class="form-control"
                  placeholder="Email"
                  name="email"
                  type="email"
                />
                <ErrorMessage name="email" />
              </FormBS.Group>

              <FormBS.Group className="mb-4">
                <Field
                  class="form-control"
                  name="nickname"
                  type="text"
                  placeholder="Pseudo"
                />
                <ErrorMessage name="nickname" />
              </FormBS.Group>

              <FormBS.Group className="mb-4">
                <Field
                  class="form-control"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <ErrorMessage name="password" />
              </FormBS.Group>

              <div className="d-flex justify-content-center">
                <Button
                  variant="outline-light"
                  className="w-50 mb-4"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Formik>
          {errorState && <p>{errorState}</p>}
          <Link to="/login">
            <p className="text-center text-white">
              Already have an account ? Login
            </p>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
