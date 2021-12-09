import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Card, Form as FormBS } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import Context from "../../components/context/Context";

const UPDATEUSERPROFILDATA = gql`
  mutation updateUserProfilData($data: UpdateUserProfileInput!) {
    updateUserProfilData(data: $data) {
      user {
        email
        nickname
      }
    }
  }
`;

const RegisterSchema = Yup.object({
  email: Yup.string().email("Format invalid"),
  password: Yup.string(),
  passwordConfirmation: Yup.string().when("password", {
    is: (val: string) => !!(val && val.length > 0),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Les deux mots de passe ne sont pas identiques."
    ),
  }),
});

type FormData = {
  email?: string;
  password?: string;
};

const UpdateUserProfile: React.FC = () => {
  const { user } = useContext(Context);
  const [errorState, setErrorState] = useState("");

  const [updateUserProfilData, { data, error }] = useMutation(
    UPDATEUSERPROFILDATA,
    {
      errorPolicy: "all",
    }
  );

  useEffect(() => {
    if (data) {
      toast.success("Votre compte a bien été mis à jour");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) {
      setErrorState(error?.graphQLErrors[0]?.message);
      toast.error("Votre compte n'a pas été modifié");
    }
  }, [error, errorState]);

  if (!user) {
    return <div>Error no user</div>;
  }

  const { email: userEmail, nickname: userNickname } = user;
  const initialValues = {
    nickname: userNickname,
    email: userEmail,
    password: "",
    passwordConfirmation: "",
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
        <Card.Title className="text-center">
          Mettre à jour mon profil
        </Card.Title>
        <Card.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={async (values) => {
              const { email, password } = values;

              const formData: FormData = {};

              if (email === userEmail && !password) {
                toast.error(
                  "Veuillez renseigner un nouveau mot de passe ou email"
                );
              } else {
                if (email !== userEmail) {
                  formData.email = email;
                }
                if (password) {
                  formData.password = password;
                }
                updateUserProfilData({ variables: { data: formData } });
              }
            }}
          >
            <Form className="login-form d-flex flex-column">
              <FormBS.Group className="mb-4 errorMessage">
                <Field
                  class="form-control"
                  placeholder="Nickname"
                  name="nickname"
                  type="text"
                  disabled
                />
                <ErrorMessage name="email" />
              </FormBS.Group>
              <FormBS.Group className="mb-4 errorMessage">
                <Field
                  class="form-control"
                  placeholder="Email"
                  name="email"
                  type="email"
                />
                <ErrorMessage name="email" />
              </FormBS.Group>

              <FormBS.Group className="mb-4 errorMessage">
                <Field
                  class="form-control"
                  name="password"
                  placeholder="Mot de passe"
                  type="password"
                />
                <ErrorMessage name="password" />
              </FormBS.Group>

              <FormBS.Group className="mb-4 errorMessage">
                <Field
                  class="form-control"
                  name="passwordConfirmation"
                  placeholder="Confirmer mot de passe"
                  type="password"
                />
                <ErrorMessage component="span" name="passwordConfirmation" />
              </FormBS.Group>

              <div className="d-flex justify-content-center">
                <Button variant="classic" className="w-50 mb-4" type="submit">
                  Modifier
                </Button>
              </div>
            </Form>
          </Formik>

          {errorState && (
            <p className="mb-4 errorMessage text-center">{errorState}</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateUserProfile;
