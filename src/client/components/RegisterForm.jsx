import React from "react";
import { Field, reduxForm } from "redux-form";
import Btn from "./common/Btn.jsx";
import Label from "./common/Label.jsx";
import Input from "./common/Input.jsx";
import "../scss/Company.scss";

// form which enables the company to set time slots
const RegisterForm = props => {
  const { handleSubmit } = props;

  return (
    <form className="company-card common-form" onSubmit={handleSubmit}>
      <label id="error_message" />
      <div className="form-row">
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
      </div>
      <div className="form-row">
        <Field
          component={Input}
          label="First Name"
          type="text"
          maxlength="30"
          name="firstname"
          required="true"
          dark="dark"
        />
        <Field
          component={Input}
          label="Last Name"
          type="text"
          maxlength="30"
          name="lastname"
          required="true"
          dark="dark"
        />
      </div>
      <div className="form-row">
        <Field
          component={Input}
          label="Email"
          type="email"
          maxlength="50"
          name="email"
          required="true"
          dark="dark"
        />
        <Field
          component={Input}
          label="Phone"
          type="tel"
          maxlength="12"
          name="phonenumber"
          required="true"
          dark="dark"
        />
      </div>
      <div className="text-row">
        <Label label_name="Client" />
        <input
          id="client"
          type="radio"
          name="user_type"
          value="client"
          defaultChecked="true"
        />
        <Label label_name="Service Provider" />
        <input
          id="service_provider"
          type="radio"
          name="user_type"
          value="service"
        />
      </div>
      <Btn color={"tertiary"} size={"lg"}>
        Register
      </Btn>
    </form>
  );
};

// connect to redux form
export default reduxForm({
  form: "register"
})(RegisterForm);
