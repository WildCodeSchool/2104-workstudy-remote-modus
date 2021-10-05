/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "../../css/styles.css";
import { useQuery, gql } from "@apollo/client";
import fakeDataPosts from "./FakeDataPosts";
import PostContainer from "./PostContainer";

const GETALLPOSTS = gql`
  query GetAllPosts {
    allPosts {
      id
      title
      wysiwyg
      skills {
        value
      }
    }
  }
`;

const AskingHelpPosts = (): JSX.Element => {
  // const { loading, error, data } = useQuery(GETALLPOSTS);

  return (
    <>
      <div>
        <h1 className="help-title">Demandes d&apos;aides</h1>
      </div>
      <div className="container-helps">
        {fakeDataPosts.map((objet) => {
          const { title, skills, wysiwyg } = objet;
          return (
            <PostContainer title={title} skills={skills} wysiwyg={wysiwyg} />
          );
        })}
      </div>
    </>
  );
};

export default AskingHelpPosts;
