import React, { useState } from "react";
import Select from "react-select";
import { gql, useMutation } from "@apollo/client";
import { Button, Form } from "react-bootstrap";
import Wysiwyg from "./Wysiwyg";
import Skill from "../../models/Skill";

interface AskingHelpFormProps {
  onSubmit: () => void;
}

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

const AskingHelpForm: React.FC<AskingHelpFormProps> = ({
  onSubmit,
}: AskingHelpFormProps) => {
  const [titleHelp, setTitleHelp] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const id = 0;

  const options = [
    { value: "Javascript", label: "Javascript" },
    { value: "GraphQL", label: "GraphQL" },
    { value: "Node", label: "Node" },
  ];

  const [addPost, { data, loading, error }] = useMutation(ADD_POST);

  const DeleteSkill = (title: string) => {
    setSkills(
      skills.filter((filteredSkill: string) => {
        return filteredSkill !== title;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      console.log(`data`, formData);
      onSubmit();
      addPost({
        variables: {
          input: formData,
        },
      });
    } else {
      console.log("title manquant");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="help-title">Formulaire de Demande d&apos;aide</h1>
      <Form className="help-form" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <div className="help-title-form">
            <Form.Label htmlFor="title">
              Titre de la demande :
              <Form.Control
                className="input-classic"
                type="text"
                name="title"
                value={titleHelp}
                placeholder="Titre..."
                data-testid="title-form"
                onChange={(e) => setTitleHelp(e.target.value)}
                required
              />
            </Form.Label>
          </div>
          <div className="skills-form">
            <div className="skills-selection">
              <Form.Label htmlFor="skills-selector">
                Technologie(s) concernée(s) :
              </Form.Label>
              <Select
                name="skills-selector"
                data-testid="select-skill-form"
                required=""
                options={options}
                onChange={(result: any) => {
                  if (result) {
                    setSkill(result.value);
                  }
                }}
                className="selector"
              />
              <Button
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
            </div>
            <div className="">
              {skills.map((oneSkill) => (
                <Skill
                  title={oneSkill}
                  onDelete={(title: string) => DeleteSkill(title)}
                  key={id + ((Math.random() * 10) / Math.random()) * 15}
                />
              ))}
            </div>
          </div>
        </Form.Group>
        <div className="">
          <p className="">Contexte et description du probleme :</p>
          <Wysiwyg
            userInput={userInput}
            setUserInput={setUserInput}
            dataTestid="wysiwyg-form"
          />
          <div>
            <Button variant="classic" type="submit" data-testid="submitButton">
              Soumettre
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AskingHelpForm;
