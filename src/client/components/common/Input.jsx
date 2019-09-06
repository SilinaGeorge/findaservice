import React from "react";
import "../../scss/Input.scss";

// component that decorates redux form input field
const renderInput = ({ input, label, dark, type, maxlen, required }) => {
  return (
    <input
      className={"text-box " + dark}
      {...input}
      placeholder={label}
      type={type}
      maxLength={maxlen}
      required={true}
      name={label}
    />
  );
};

export default renderInput;
