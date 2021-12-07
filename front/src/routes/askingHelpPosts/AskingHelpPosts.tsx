/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "../../css/styles.css";
import { useQuery, gql } from "@apollo/client";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import fakeDataPosts from "./FakeDataPosts";
import Context from "../../components/context/Context";
import PostContainer, { PostProps, Skill } from "./PostContainer";

const GETALLPOSTS = gql`
  query GetAllPosts {
    allPosts {
      _id
      title
      wysiwyg
      skills {
        value
      }
    }
  }
`;

const AskingHelpPosts = (): JSX.Element => {
  const { data, refetch } = useQuery(GETALLPOSTS);
  const [allPosts, setAllPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    refetch();
    if (data && data.allPosts) setAllPosts([...data.allPosts]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Row className="w-auto m-0 bg h-100">
      <Col className="d-flex align-items-center flex-column p-0">
        <h3 className="text-warning text-center mt-4">
          Demander de l&apos;aide
        </h3>
        {allPosts.length > 0 || allPosts ? (
          <Accordion className="mb-4 w-75 border rounded border-warning">
            {allPosts.map((post: PostProps, id: number) => {
              const key = `post-${id}`;
              const listOfSkills = post.skills.map((skill: Skill) => {
                return skill;
              });
              const eventKey = id.toString();
              return (
                <PostContainer
                  key={key}
                  eventKey={eventKey}
                  title={post.title}
                  skills={listOfSkills}
                  wysiwyg={post.wysiwyg}
                />
              );
            })}
          </Accordion>
        ) : (
          <div className="h-100 d-flex justify-content-center align-items-center flex-column">
            <h1 className="text-white">
              Il n&apos;y a pas encore de demandes d&apos;aide....
            </h1>
            <a
              href="/AskingHelpForm"
              className="text-decoration-none text-warning"
            >
              Créer une demande
            </a>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default AskingHelpPosts;
