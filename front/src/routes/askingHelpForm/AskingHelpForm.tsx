/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Wysiwyg from "./Wysiwyg";
import Skill from "../../models/Skill";

const ADD_POST = gql`
  mutation AddPost($input: inputAddPost!) {
    addPost(data: $input) {
      title
      wysiwyg
      skills {
        value
      }
    }
  }
`;

const GET_SKILLS = gql`
  query {
    allSkills {
      value
    }
  }
`;

type Option = {
  value: string;
  label: string;
};

type AllSkill = {
  value: string;
};

const AskingHelpForm: React.FC = () => {
  const [titleHelp, setTitleHelp] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [userInput, setUserInput] = useState("");
  const id = 0;
  const history = useHistory();

  const [addPost, { error }] = useMutation(ADD_POST, {
    errorPolicy: "all",
  });
  const { data } = useQuery(GET_SKILLS, {
    errorPolicy: "all",
  });
  useEffect(() => {
    if (data) {
      const skillOptions: Option[] = [];
      data.allSkills.forEach((comp: AllSkill) => {
        skillOptions.push({ value: `${comp.value}`, label: `${comp.value}` });
      });
      setOptions(skillOptions);
    }
  }, [data]);

  const DeleteSkill = (title: string) => {
    setSkills(
      skills.filter((filteredSkill: string) => {
        return filteredSkill !== title;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleHelp) {
      const formData = {
        title: titleHelp,
        skills: skills.map((skillVal) => ({
          value: skillVal,
        })),
        wysiwyg: userInput,
      };
      JSON.stringify(formData);
      await addPost({
        variables: {
          input: formData,
        },
      });
      toast.info("Ta demande a bien été postée");
      history.push("/aides");
    } else {
      toast.error(`${error}`);
    }
  };

  return (
    <Row className="w-auto m-0 bg">
      <Col>
        <h3 className="text-warning text-center mt-4">
          Demander de l&apos;aide
        </h3>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="m-auto d-flex flex-column w-75"
        >
          <div className="mt-4">
            <h6 className="text-white">
              Ici vous pouvez remplir une demande d&apos;aide sur un sujet
              spécifique. Renseingez les grandes lignes de votre projet /
              problématique afin que le/la mentor séléctionné.e puisse
              comprendre en quelques lignes en quoi il pourra vous aider.
            </h6>
          </div>
          <Card className="border rounded border-warning bg-transparent p-4">
            <Card.Body>
              <Row className="mb-4">
                <Col>
                  <Form.Label>Titre de la demande :</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={titleHelp}
                    placeholder="Titre..."
                    data-testid="title-form"
                    onChange={(e) => setTitleHelp(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label htmlFor="skills-selector">
                    Technologie(s) concernée(s) :
                  </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex">
                  <Select
                    className="text-dark w-75"
                    name="skills-selector"
                    data-testid="select-skill-form"
                    required=""
                    options={options}
                    onChange={(result: any) => {
                      if (result) {
                        setSkill(result.value);
                      }
                    }}
                  />
                  <Button
                    className="text-white"
                    variant="add-skills"
                    type="button"
                    data-testid="skill-button-form"
                    disabled={skills.includes(skill)}
                    onClick={() => {
                      setSkills([...skills, skill]);
                    }}
                  >
                    <i className="fas fa-plus" />
                  </Button>
                </Col>
                <Col className="d-flex justify-content-evenly flex-wrap">
                  {skills.map((oneSkill) => (
                    <Skill
                      title={oneSkill}
                      onDelete={(title: string) => DeleteSkill(title)}
                      key={id + ((Math.random() * 10) / Math.random()) * 15}
                    />
                  ))}
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="p-4">
            <Card.Title className="text-dark">
              Contexte et description du probleme :
            </Card.Title>
            <Card.Body>
              <Wysiwyg
                userInput={userInput}
                setUserInput={setUserInput}
                dataTestid="wysiwyg-form"
              />
            </Card.Body>
          </Card>
          <div className="align-right">
            <Button variant="classic" type="submit" data-testid="submitButton">
              Submit
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default AskingHelpForm;
