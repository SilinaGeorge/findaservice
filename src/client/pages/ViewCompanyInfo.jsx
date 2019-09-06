import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index.js";
import Header from "../components/common/Header.jsx";
import Label from "../components/common/Label.jsx";
import Alert from "../components/common/Alert.jsx";
import { Container, Row, Col } from "reactstrap";
import Btn from "../components/common/Btn.jsx";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_red.css";
import "../scss/Label.scss";
import "../scss/ViewCompany.scss";

class ViewCompanyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      message: ""
    };
    this.onCalendarChange = this.onCalendarChange.bind(this);
    this.onBookClick = this.onBookClick.bind(this);
  }

  onBookClick(event) {
    const time_dropbox = document.getElementById("available_times");
    if (
      !this.props.logged_in_user ||
      !Object.keys(this.props.logged_in_user).length
    ) {
      this.setState({
        showAlert: true,
        message: "Must be logged in to book"
      });
    } else if (time_dropbox.value != "") {
      let to_from_array = time_dropbox.value.split("-");
      let from = to_from_array[0];
      let to = to_from_array[1];
      let userID = this.props.logged_in_user.username;
      let serviceID = this.props.location.state.detail._id;
      let company = this.props.location.state.detail.company;
      let companyUsername = this.props.location.state.detail.name;
      let date = new Date(
        document.querySelector("#calendar").value
      ).toUTCString();
      let email = this.props.logged_in_user.email;
      let phonenumber = this.props.logged_in_user.phonenumber;
      let name = this.props.logged_in_user.name;

      this.props.bookAppointment(
        to,
        from,
        userID,
        serviceID,
        date,
        company,
        email,
        phonenumber,
        name,
        companyUsername
      );
    } else {
      this.setState({
        showAlert: true,
        message: "Must select an available time"
      });
    }
  }

  onCalendarChange(date) {
    date = date.date[0];
    const dropbox = document.getElementById("available_times");

    dropbox.innerHTML = "";
    let opt = document.createElement("option");
    opt.innerHTML = "Select";
    opt.value = "";
    dropbox.appendChild(opt);

    let appointments = this.props.companyAppointInfoResponse;
    let available_times = this.props.location.state.detail.times;

    // find available dates
    if (appointments != undefined && appointments.length > 0) {
      let inavailable_times = [];

      // find appointments for this day
      let appointments_for_date = appointments.filter(function(a) {
        let appointment_date = new Date(a.date);
        return (
          appointment_date.getUTCDate() == date.getDate() &&
          appointment_date.getMonth() == date.getMonth() &&
          appointment_date.getFullYear() == date.getFullYear()
        );
      });

      // find inavailable times for this day based on appointments
      for (let a of appointments_for_date) {
        inavailable_times.push({ to: a.to, from: a.from });
      }
      for (let inavail of inavailable_times) {
        available_times = available_times.filter(function(a) {
          return a.to != inavail.to || a.from != inavail.from;
        });
      }
    }
    // populate availbility dropbox
    for (let avail of available_times) {
      let opt = document.createElement("option");
      opt.innerHTML = avail.from + "-" + avail.to;
      opt.value = avail.from + "-" + avail.to;
      dropbox.appendChild(opt);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let response = this.props.bookAppointResponse;
    if (response != prevProps.bookAppointResponse && response != "") {
      if (response == "Success") {
        this.setState({
          showAlert: true,
          message: "Booking was a success"
        });
      } else {
        this.setState({
          showAlert: true,
          message: "Booking did not go through, an error occured"
        });
      }
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    this.props.getAppointmentsCompany(this.props.location.state.detail._id);
  }

  render() {
    return (
      <div>
        <main>
          <Header />
          <Container className="booking-details">
            {this.state.showAlert
              ? <Alert message={this.state.message} />
              : null}
            <Row>
              <Col xs="12" sm="9" className="company-card">
                <div className="booking-row">
                  <p className="booking-sub">Company Details: </p>
                  <h2>
                    {this.props.location.state.detail.company}
                  </h2>
                  <p className="booking-description">
                    {this.props.location.state.detail.description}
                  </p>
                  <p>
                    {this.props.location.state.detail.address}
                  </p>
                </div>
                <div>
                  <p className="booking-sub">Book: </p>
                  <div className="booking-calendar">
                    <Label label_name="Select Date: " />
                    <Flatpickr
                      id="calendar"
                      placeholder="Select Date..."
                      onChange={date => {
                        this.onCalendarChange({ date });
                      }}
                      options={{
                        altInput: true,
                        altFormat: "F j, Y",
                        dateFormat: "Y-m-d",
                        minDate: "today"
                      }}
                    />
                    <Label label_name="Available Times: " />
                    <select id="available_times">
                      <option value="">Select</option>
                    </select>
                  </div>
                </div>
              </Col>
              <Col sm="3" className="btn-container">
                <Btn color={"tertiary"} size={"lg"} onClick={this.onBookClick}>
                  Book
                </Btn>
                <div className="divder" />
                <h6>Tags: </h6>
                <Label
                  label_name={this.props.location.state.detail.tags.join(", ")}
                />
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    );
  }
}

// get the reducer state
const mapStateToProps = state => {
  return {
    logged_in_user: state.logged_in_user_info,
    companyAppointInfoResponse: state.appointments.appointments,
    bookAppointResponse: state.appointments.status
  };
};

export default connect(mapStateToProps, actions)(ViewCompanyInfo);
