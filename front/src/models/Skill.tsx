import React from "react";
import { Badge, Button } from "react-bootstrap";

export interface SkillProps {
  title: string;
  _id?: string;
  onDelete: (title: string) => void;
}

function Skill({ title, onDelete }: SkillProps): JSX.Element {
  return (
    <h4>
      <Badge pill className="selected-skills">
        {title}
      </Badge>
      <Button
        variant="add-skills"
        onClick={() => onDelete(title)}
        type="button"
      >
        <i className="fas fa-times" />
      </Button>
    </h4>
  );
}

export default Skill;
