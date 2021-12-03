import React, { useState } from "react";
import { Col, Card, Button, Collapse, Accordion } from "react-bootstrap";
import "../../css/styles.css";

export type PostProps = {
  title: string;
  wysiwyg: string;
  skills: string[];
  eventKey: string;
};

const PostContainer = (props: PostProps): JSX.Element => {
  const { title, skills, wysiwyg, eventKey } = props;
  const cleanWysiwyg = wysiwyg.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <Accordion.Item eventKey={eventKey} className="bg-transparent">
      <Accordion.Header>
        <Col xs="1">
          {skills.map((skill) => {
            return <div>{skill}</div>;
          })}
        </Col>
        <Col className="title-post">{title}</Col>
      </Accordion.Header>
      <Accordion.Body className="m-4">
        {cleanWysiwyg.substring(0, 200)}...
        <Button variant="details">
          En lire plus <i className="fas fa-meteor" />
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default PostContainer;
