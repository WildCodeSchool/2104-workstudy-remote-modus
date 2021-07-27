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
  const { loading, error, data } = useQuery(GETALLPOSTS);
  if (data !== undefined) {
    console.log("coucou", data.allPosts);
  }
  return (
    <>
      <h1>HELLO </h1>
      <div className="container">
        {fakeDataPosts.map((objet) => {
          const { title, techno, summary } = objet;
          return (
            <PostContainer title={title} techno={techno} summary={summary} />
          );
        })}
      </div>
    </>
  );
};

export default AskingHelpPosts;
