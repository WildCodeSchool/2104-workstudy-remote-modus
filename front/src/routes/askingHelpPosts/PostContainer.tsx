import React from "react";
import { Col, Button, Accordion } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../../css/styles.css";

export type PostContainerProps = {
  title: string;
  wysiwyg: string;
  skills: [{ value: string; label: string }];
  eventKey: string;
  postId: string;
};

const PostContainer = (props: PostContainerProps): JSX.Element => {
  const { title, skills, wysiwyg, eventKey, postId } = props;
  const cleanWysiwyg = wysiwyg.replace(/<\/?[^>]+(>|$)/g, "");
  const history = useHistory();

  return (
    <Accordion.Item eventKey={eventKey} className="bg-transparent">
      <Accordion.Header>
        <Col xs="1">
          {skills.map((skill: { value: string; label: string }, id: number) => {
            const key = `skill-${id}`;
            return <div key={key}>{skill.value}</div>;
          })}
        </Col>
        <Col className="title-post">{title}</Col>
      </Accordion.Header>
      <Accordion.Body className="m-4">
        <div className="text-truncate">{cleanWysiwyg}</div>
        <Button
          variant="details"
          onClick={() => history.push(`aides/${postId}`)}
        >
          En lire plus <i className="fas fa-meteor" />
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default PostContainer;
