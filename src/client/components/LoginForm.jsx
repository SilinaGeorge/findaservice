import React from "react";
import { Field, reduxForm } from "redux-form";
import Btn from "./common/Btn.jsx";
import Label from "./common/Label.jsx";
import Input from "./common/Input.jsx";
import "../scss/Company.scss";

// form which enables the company to set time slots
const LoginForm = props => {
  const { handleSubmit } = props;

  return (
    <form className="company-card common-form" onSubmit={handleSubmit}>
      <label id="error_message" />
      <Field
        component={Input}
        label="Username"
        type="text"
        maxlength="20"
        name="username"
        required="true"
        dark="dark"
      />
      <Field
        component={Input}
        label="Password"
        type="password"
        maxlength="12"
        name="password"
        required="true"
        dark="dark"
      />
      <Btn color={"tertiary"} size={"lg"}>
        Login
      </Btn>
    </form>
  );
};

// connect to redux form
export default reduxForm({
  form: "login"
})(LoginForm);
