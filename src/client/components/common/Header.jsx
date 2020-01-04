import React, { Component } from "react";
import { Nav, NavItem, NavLink, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import CommonForm from "../CommonForm.jsx";
import "../../scss/Header.scss";

// Header component
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHome: props.showHome,
      search: props.search
    };
    this.submitForm = this.submitForm.bind(this);
  }

  // function that gets the form values
  submitForm(values) {
    // store the values and navigate to the next page
    if (values.Service != undefined) {
      this.props.searchServices(values);
    }
  }

  // display the logo if props showHome is not false
  displayLogo = () => {
    return (
      <Col>
        <NavItem>
          <NavLink tag={Link} to="/">
            Home
          </NavLink>
        </NavItem>
      </Col>
    );
  };

  // add search bar in header
  displaySearch = () => {
    return (
      <Col>
        <CommonForm
          inputs={["Service", "Location"]}
          btn="Search"
          onSubmit={this.submitForm}
          formStyle="row"
          dark="dark"
        />
      </Col>
    );
  };

  // display the nav items if search bar isnt  requested
  displayNavLinks = () => {
    return (
      <Col>
        <NavItem>
          <NavLink tag={Link} to="/Discover">
            Discover
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/Credits">
            Credits
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://find--a--service.herokuapp.com/api-docs.md">
            Docs
          </NavLink>
        </NavItem>
      </Col>
    );
  };

  displayLogout = () => {
    return (
      <Col>
        <NavItem>
          <NavLink
            onClick={() => this.props.logout()}
            className="tertiary-btn"
            tag={Link}
            to="/"
          >
            Logout
          </NavLink>
        </NavItem>
      </Col>
    );
  };

  displaySettings = () => {
    return (
      <Col>
        <NavItem>
          <NavLink
            tag={Link}
            to={{ pathname: "/Company", query: { edit: true } }}
          >
            Manage
          </NavLink>
        </NavItem>
      </Col>
    );
  };

  displayLogin = () => {
    return (
      <Col>
        <NavItem>
          <NavLink className="secondary-btn" tag={Link} to="/Login">
            Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="tertiary-btn" tag={Link} to="/Register">
            Register
          </NavLink>
        </NavItem>
      </Col>
    );
  };

  // dynamic header
  render() {
    return (
      <div className="nav-bar">
        <Nav className="header-nav">
          {this.state.showHome == false ? null : this.displayLogo()}
          {this.state.search ? this.displaySearch() : this.displayNavLinks()}
          {this.props.user.service ? this.displaySettings() : null}
          {this.props.user.username
            ? this.displayLogout()
            : this.displayLogin()}
        </Nav>
      </div>
    );
  }
}

// get the reducer state
const mapStateToProps = state => {
  return {
    // users state object
    user: state.logged_in_user_info,
    query: state.search
  };
};

export default connect(mapStateToProps, actions)(Header);
