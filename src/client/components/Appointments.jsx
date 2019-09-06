import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import NotFound from "./common/NotFound.jsx";
import "../scss/appointments.scss";

// Takes an array of appointments and display them
class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: props.appointments,
      user: props.login_user_info.username
    };
  }

  // get all appointments
  componentDidMount() {
    if (this.props.login_user_info.service) {
      this.props.getAppointmentsCompanyUsername(this.state.user);
    }
    this.props.getAppointments(this.state.user);
  }

  // redraw component if prev location/service updates
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.status !== nextProps.status ||
      this.props.appointments !== nextProps.appointments
    );
  }

  // update the state if the props update
  componentWillReceiveProps(nextProps) {
    // update the appointment on status change
    if (
      this.props.status !== nextProps.status ||
      this.props.appointments !== nextProps.appointments
    ) {
      this.setState({ appointments: nextProps.appointments });
    }
  }

  // cancel the appintment given its id
  deleteAppointment = id => {
    this.props.cancelAppointments(id);
  };

  // display each appointment
  renderIcons = appointments => {
    return appointments.map(apt => {
      return (
        <div
          key={
            "" + new Date().getMilliseconds() + Math.floor(Math.random() * 1000)
          }
        >
          <div className="appointment-title">
            <p className="appointment-date">
              {apt.date.split("00:00:00")[0]}
            </p>
            <img
              className="appointment-icon"
              onClick={() => this.deleteAppointment(apt._id)}
              src={require("../media/cancel.png")}
            />
          </div>
          <div className="appointment-details">
            <p className="appointment-time">
              {apt.to + " " + apt.from}
            </p>
            <p className="appointment-company">
              {apt.company}
            </p>
          </div>
        </div>
      );
    });
  };

  // display the no results found component
  notFound = user => {
    return <NotFound result={user} />;
  };

  render() {
    const { appointments, user } = this.state;
    return (
      <div className="appointment-container">
        <p>
          {this.props.login_user_info.facebook
            ? this.props.login_user_info.name + "'s Appointments:"
            : this.props.login_user_info.username + "'s Appointments:"}
        </p>
        {appointments != undefined && appointments.length > 0
          ? this.renderIcons(appointments)
          : this.notFound(user)}
      </div>
    );
  }
}

// get the reducer state
const mapStateToProps = state => {
  return {
    appointments: state.appointments.appointments,
    status: state.appointments.status,
    companyId: state.service.data,
    login_user_info: state.logged_in_user_info
  };
};

export default connect(mapStateToProps, actions)(Appointments);
