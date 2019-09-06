import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index.js";
import Header from "../components/common/Header.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import "../scss/Label.scss";

// Auth page component to handle register
class Register extends Component {
  constructor(props) {
    super(props);

    this.onRegisterClick = this.onRegisterClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.registerResponse) {
      const response = this.props.registerResponse;

      if (response.message == "Success") {
        if (response.service)
          this.props.history.push({
            pathname: "/Company",
            query: { edit: false }
          });
        else this.props.history.push("/");
      } else {
        document.getElementById("error_message").innerHTML = response.message;
      }
    }
  }

  onRegisterClick(values) {
    if (document.getElementById("service_provider").checked) {
      this.props.register(
        values.username,
        values.password,
        values.firstname,
        values.lastname,
        values.phonenumber,
        values.email,
        true
      );
    } else
      this.props.register(
        values.username,
        values.password,
        values.firstname,
        values.lastname,
        values.phonenumber,
        values.email,
        false
      );
  }

  render() {
    return (
      <div>
        <main>
          <Header />
          <div>
            <h2 className="Auth-title">Register</h2>
            <RegisterForm onSubmit={this.onRegisterClick} />
          </div>
        </main>
      </div>
    );
  }
}

// get the reducer state
const mapStateToProps = state => {
  return {
    registerResponse: state.login
  };
};

export default connect(mapStateToProps, actions)(Register);
