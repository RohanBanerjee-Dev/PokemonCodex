import React from "react";
import LoadingBar from "react-top-loading-bar";

const Loader = ({ progress, color = "#f11946", setProgress }) => {
  return (
    <LoadingBar
      color={color}
      height={3}
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
};

export default Loader;
