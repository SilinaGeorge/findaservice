import React, { Component } from "react";
import "../../scss/TimeCard.scss";

// Takes an array of player objects and creates icons
class TimeSlots extends Component {
  // For each time create an icon card
  renderIcons = () => {
    let items = this.props.times;
    return items.map(time => {
      return (
        <div key={time.id} className="time-card">
          <div className="time-tofrom">
            {time.from + " " + time.to}
          </div>
          <div
            onClick={() => this.props.onClick(time.id)}
            className="time-icon"
          >
            X
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="times-available">
        {this.renderIcons()}
      </div>
    );
  }
}

export default TimeSlots;
