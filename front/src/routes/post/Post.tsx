/* eslint-disable react/no-children-prop */
import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Markup } from "interweave";
import { Skill } from "../askingHelpPosts/PostContainer";

const GETPOSTBYID = gql`
  query getPostById($id: String!) {
    getPostById(id: $id) {
      title
      wysiwyg
      skills {
        value
      }
    }
  }
`;

interface PostProps {
  title: string;
  wysiwyg: string;
  skills: Skill[];
}

const Post = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery(GETPOSTBYID, {
    variables: { id },
  });
  const [postInfo, setPostInfo] = useState<PostProps>({
    title: "",
    wysiwyg: "",
    skills: [],
  });

  useEffect(() => {
    if (data) {
      setPostInfo(data.getPostById);
    }
  }, [data]);

  return (
    <Row className="w-75 m-auto bg">
      <Col>
        <h3 className="text-warning text-center mt-4">{postInfo.title}</h3>
        <Card className="border rounded border-warning bg-transparent p-4">
          <Card.Body>
            <Card.Title className="d-flex mb-4">
              {postInfo.skills.map((skill, i) => {
                const key = `skill-${i}`;
                return (
                  <div key={key} className="list_skills">
                    {skill.value}
                  </div>
                );
              })}
            </Card.Title>
            <Row className="mb-4">
              <Markup content={postInfo.wysiwyg} />
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Post;
