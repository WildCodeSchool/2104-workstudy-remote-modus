import React, { useContext } from "react";
import "../../css/styles.css";
import { gql } from "@apollo/client";
import fakeDataPosts from "./FakeDataPosts";
import PostContainer from "./PostContainer";
import Context from "../../components/context/Context";

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
  return (
    <>
      <div>
        <h3 className="text-warning text-center mt-4">
          Liste des demandes d&apos;aides
        </h3>
      </div>
      <div className="container-helps">
        {fakeDataPosts.map((objet) => {
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
      </div>
    </>
  );
};

export default AskingHelpPosts;
