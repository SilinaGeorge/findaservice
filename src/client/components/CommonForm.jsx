import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Field, reduxForm } from "redux-form";
import Btn from "./common/Btn.jsx";
import Input from "./common/Input.jsx";
import "../scss/form.scss";
import { required, email, length } from 'redux-form-validators'

// Create a form given the input name array
class CommonForm extends Component {

  
  constructor(props) {
    super(props);
    this.renderFields = this.renderFields.bind(this);
  }

  
  // For each input create a field
  renderFields = (inputs, darkfield) => {
 
    
    return inputs.map(field => {
      let maxLength = 100
      let key =
        "" + new Date().getMilliseconds() + Math.floor(Math.random() * 1000);
      let fieldType = "text";
      if (field == "Password") {
        fieldType = "password";
        maxLength = 15
      } else if (fieldType == "Email") {
        fieldType = "email";
      }
      return (
        <Field
          label={field}
          dark={darkfield}
          component={Input}
         /*  validate={length({ max: maxLength, message:'too long' })} */
          type={fieldType}
          name={field}  
          key={field + ""}
        />
      );
    });
  };

  render() {
    const { handleSubmit, inputs, btn, formStyle, dark } = this.props;
    // if no form style is given, give common as default
    let fstyle = "";
    {
      formStyle != undefined ? (fstyle = formStyle) : (fstyle = "common");
    }
    return (
      <form className={fstyle + "-form"} onSubmit={handleSubmit}>
        {this.renderFields(inputs, dark)}
        <Btn size={"lg"} color={"tertiary"}>
          {btn}
        </Btn>
      </form>
    );
  }
}

// connect to redux form
CommonForm = reduxForm({
  form: "common"
})(CommonForm);

CommonForm = connect(
  state => ({
    initialValues: state.account.data // pull initial values from account reducer
  }),
  actions // bind account loading action creator
)(CommonForm);

export default CommonForm;
