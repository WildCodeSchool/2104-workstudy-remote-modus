/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from "react";
// import { gql } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Card, Form as FormBS } from "react-bootstrap";
import { Link } from "react-router-dom";
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
        <Card.Title className="text-center">Login</Card.Title>
        <Card.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              try {
                const { email, password } = values;
                const formData = {
                  email,
                  password,
                };
                JSON.stringify(formData);
                await logUser(formData);
                console.log("soumission");
              } catch (err: any) {
                setError(err.message);
              }
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

          <Link to="/register">
            <p className="text-center text-white">
              Don&apos;t have an account ? Register
            </p>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
