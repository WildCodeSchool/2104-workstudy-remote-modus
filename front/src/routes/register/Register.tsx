import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Card, Form as FormBS } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

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
    .email("Format invalide")
    .required("Une adresse email est requise"),
  password: Yup.string().required("Un mot de passe est requis"),
  passwordConfirmation: Yup.string().when("password", {
    is: (val: string) => !!(val && val.length > 0),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Les deux mots de passe ne sont pas identiques."
    ),
  }),
  nickname: Yup.string().required("Un pseudonyme est requis"),
});

const Register: React.FC = () => {
  const [isSubmited, setIsSubmited] = useState(false);
  const history = useHistory();
  const initialValues = {
    nickname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const [register, { data, error, loading }] = useMutation(REGISTER, {
    errorPolicy: "all",
  });

  useEffect(() => {
    if (data) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!loading) {
      if (error && isSubmited) {
        setIsSubmited(false);
        toast.error(error.message);
      }
      if (isSubmited && !error) toast("Votre compte a bien été crée");
    }
  }, [error, isSubmited, loading]);

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
        <Card.Title className="text-center">S&apos;inscrire</Card.Title>
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
              setIsSubmited(true);
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
                  name="nickname"
                  type="text"
                  placeholder="Pseudo"
                />
                <ErrorMessage name="nickname" />
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

              <FormBS.Group className="mb-4 errorMessage">
                <Field
                  className="form-control"
                  name="passwordConfirmation"
                  placeholder="Verifier le mot de passe"
                  type="password"
                />
                <ErrorMessage component="span" name="passwordConfirmation" />
              </FormBS.Group>

              <div className="d-flex justify-content-center">
                <Button variant="classic" className="w-50 mb-4" type="submit">
                  Inscription
                </Button>
              </div>
            </Form>
          </Formik>
          <Link to="/">
            <p className="text-center text-white">Vous avez déjà un compte ?</p>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
