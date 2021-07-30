import React from "react";
import "../../css/styles.css";

type PostContainerProps = {
  title: string;
  wysiwyg: string;
  skills: string[];
};

const PostContainer = (props: PostContainerProps): JSX.Element => {
  const { title, skills, wysiwyg } = props;
  return (
    <div>
      <div>
        <img src="" alt="" />
        <p>{skills}</p>
      </div>
      <div>
        <h3>{title}</h3>
        <p>{wysiwyg}</p>
      </div>
      <button type="button"> En savoir plus</button>
    </div>
  );
};

export default PostContainer;
