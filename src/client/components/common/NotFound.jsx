import React from "react";
import "../../scss/Home.scss";

// Component to display not found errors or no results
const NotFound = ({ result }) => {
  return (
    <div className="nomatch">
      <img src={require("../../media/target.png")} />
      <p className="sorry-text">
        Sorry we couldn't find anything for {result}
      </p>
    </div>
  );
};

export default NotFound;
