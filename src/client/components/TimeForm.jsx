import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import TimePicker from "react-times";
import "react-times/css/classic/default.css";
import Btn from "./common/Btn.jsx";
import Input from "./common/Input.jsx";
import "../scss/form.scss";

export default class TimeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toTime: null, // to time
      fromTime: null, // from time
      toMeridiem: null,
      fromMeridiem: null
    };

    this.onfromMeridiemChange = this.onfromMeridiemChange.bind(this);
    this.ontoMeridiemChange = this.ontoMeridiemChange.bind(this);
    this.onfromTimeChange = this.onfromTimeChange.bind(this);
    this.ontoTimeChange = this.ontoTimeChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  // update the to and from time state

  onfromTimeChange(time) {
    this.setState({ fromTime: time });
  }

  ontoTimeChange(time) {
    this.setState({ toTime: time });
  }

  // update the AM PM for to and from fields

  onfromMeridiemChange(meridiem) {
    this.setState({ fromMeridiem: meridiem });
  }

  ontoMeridiemChange(meridiem) {
    this.setState({ toMeridiem: meridiem });
  }

  // send back the data to the parent class
  submit = () => {
    const { toTime, fromTime, toMeridiem, fromMeridiem } = this.state;
    const to = toTime + " " + toMeridiem;
    const from = fromTime + " " + fromMeridiem;
    const id =
      "" + new Date().getMilliseconds() + Math.floor(Math.random() * 1000);
    this.props.onSubmit(from, to, id);
  };

  render() {
    return (
      <div className="time-form">
        <div className="time-box">
          <p>From:</p>
          <TimePicker
            onMeridiemChange={this.onfromMeridiemChange}
            onTimeChange={this.onfromTimeChange}
            theme="classic"
            time={this.state.fromTime}
            meridiem={this.state.fromMeridiem}
            timeMode="12"
            withoutIcon={true}
          />
        </div>
        <div className="time-box">
          <p>To:</p>
          <TimePicker
            onMeridiemChange={this.ontoMeridiemChange}
            onTimeChange={this.ontoTimeChange}
            theme="classic"
            time={this.state.toTime}
            meridiem={this.state.toMeridiem}
            timeMode="12"
            withoutIcon={true}
          />
        </div>
        <Btn onClick={() => this.submit()} color={"tertiary"} size={"lg"}>
          Add Time
        </Btn>
      </div>
    );
  }
}
