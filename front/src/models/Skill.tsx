import React from "react";
import { Button } from "react-bootstrap";

export interface SkillProps {
  title: string;
  _id?: string;
  onDelete: (title: string) => void;
}

function Skill({ title, onDelete }: SkillProps): JSX.Element {
  return (
    <div>
      <div className="selected-skills">{title}</div>
      <Button
        variant="add-skills"
        onClick={() => onDelete(title)}
        type="button"
      >
        x
      </Button>
    </div>
  );
}

export default Skill;
