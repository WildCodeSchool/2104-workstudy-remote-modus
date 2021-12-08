import React from "react";
import Loader from "react-loader-spinner";
import "./loader.css";

const Loading: React.FC = () => {
  return (
    <div className="fallback-container">
      <Loader
        type="Oval"
        color="#EDAE49"
        height={100}
        width={100}
        timeout={3000} // 3 secs
      />
    </div>
  );
};

export default Loading;
