import React from "react";
import "../../scss/Register.scss";

// Label Component
const Label = ({ label_name }) => {
  return (
    <label className="label">
      {label_name}
    </label>
  );
};

export default Label;
