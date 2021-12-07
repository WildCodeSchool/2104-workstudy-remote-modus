import React, { useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap";
import "../../css/styles.css";

type PostContainerProps = {
  title: string;
  wysiwyg: string;
  skills: string[];
};

const PostContainer = (props: PostContainerProps): JSX.Element => {
  // Skills n'est pas utilisé (Temporaire)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, skills, wysiwyg } = props;
  const [open, setOpen] = useState(false);

  return (
    <Card className="card-posts">
      <div className="card-box">
        <div id="skills">
          <img src="logo192.png" className="skills-logo" alt="React" />
          <img
            className="skills-logo"
            src="https://res.cloudinary.com/dykscnyvu/image/upload/v1627551047/Moddusey/js_logo_mhnbpf.png"
            alt="JavaScript"
          />
        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {`${wysiwyg.substring(0, 200)}...`}
          <Collapse in={open}>
            <div id="collapse-text">
              {`${wysiwyg.substring(199)}`}{" "}
              <Button variant="details">
                Détails <i className="fas fa-meteor" />
              </Button>
            </div>
          </Collapse>
        </Card.Body>
        <div>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="collapse-text"
            aria-expanded={open}
            variant="infos"
          >
            <i className="fas fa-caret-down fa-3x" />
          </Button>
        </div>
      </div>
      <hr id="post-line" />
    </Card>
  );
};

export default PostContainer;
