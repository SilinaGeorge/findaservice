import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index.js";
import Header from "../components/common/Header.jsx";
import LoginForm from "../components/LoginForm.jsx";
import FacebookLogin from "react-facebook-login";
import "../scss/Label.scss";

// Auth page component to handle login/register
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.onLoginClick = this.onLoginClick.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const response = this.props.loginResponse;
    if (response && response != prevProps.loginResponse)
      if (
        response.message == "Success" ||
        response.message == "New Facebook User Created"
      ) {
        // redirect to home once data is valid
        this.props.history.push("/");
      } else {
        document.getElementById("error_message").innerHTML = response.message;
      }
  }

  onLoginClick(values) {
    this.props.login(values.username, values.password);
    // store the username
    this.setState({ username: values.username });
  }

  responseFacebook = response => {
    this.props.loginFacebook(
      response.id,
      response.first_name,
      response.last_name,
      response.email
    );
  };

  render() {
    return (
      <div>
        <main>
          <Header />
          <div>
            <h2 className="Auth-title">Login</h2>
            <LoginForm onSubmit={this.onLoginClick} />
{/*             <FacebookLogin
              appId="1798335077141814"
              autoLoad={false}
              fields="first_name, last_name, email"
              callback={this.responseFacebook}
              icon="fa-facebook"
            /> */}
          </div>
        </main>
      </div>
    );
  }
}

// get the reducer state
const mapStateToProps = state => {
  return {
    loginResponse: state.login
  };
};

export default connect(mapStateToProps, actions)(Login);
