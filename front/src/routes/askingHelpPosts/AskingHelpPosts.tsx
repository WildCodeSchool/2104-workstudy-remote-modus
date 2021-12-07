/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "../../css/styles.css";
import { useQuery, gql } from "@apollo/client";
import { Accordion, Col, Row } from "react-bootstrap";
import fakeDataPosts from "./FakeDataPosts";
import Context from "../../components/context/Context";
import PostContainer, { PostProps } from "./PostContainer";

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
  const { user } = useContext(Context);

  console.log(user);
  const { loading, error, data } = useQuery(GETALLPOSTS);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    if (data && data.allPosts) setAllPosts(data.allPosts);
  }, [data]);

  return (
    <Row className="w-auto m-0 bg">
      <Col className="d-flex justify-content-center align-items-center flex-column p-0">
        <h3 className="text-warning text-center mt-4">
          Demander de l&apos;aide
        </h3>
        <Accordion className="mb-4 w-75 border rounded border-warning">
          {allPosts.map((post: any, id) => {
            const key = `post-${id}`;

            console.log("skills", post.skills);
            const eventKey = id.toString();
            const test = Object.values({ value: "l", typename: "k" });
            return (
              <PostContainer
                key={key}
                eventKey={eventKey}
                title={post.title}
                skills={test}
                // skills={post.skills}
                wysiwyg={post.wysiwyg}
              />
            );
          })}
        </Accordion>
      </Col>
    </Row>

    /* <div>
        <h3 className="text-warning text-center mt-4">
          Liste des demandes d&apos;aides
        </h3>
      </div>
      <div className="container-helps">
        {allPosts.map((objet: any) => {
          const { title, skills, wysiwyg } = objet;
          return (
            <PostContainer
              key={title}
              title={title}
              skills={skills}
              wysiwyg={wysiwyg}
            />
          );
        })}
      </div> */
  );
};

export default AskingHelpPosts;
