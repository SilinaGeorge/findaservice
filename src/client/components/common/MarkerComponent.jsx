import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

const { Marker, InfoWindow } = require("react-google-maps");
const FaAnchor = require("react-icons/lib/fa/anchor");

// Header component
class MarkerComponent extends Component {
  constructor(props) {
    super(props);
  }

  // dynamic MarkerComponent
  render() {
    const { lat, lng, name } = this.props;
    return (
      <Marker
        key={
          "" + new Date().getMilliseconds() + Math.floor(Math.random() * 1000)
        }
        position={{ lat, lng }}
        onClick={() => this.props.callback(name)}
      >
        <InfoWindow onCloseClick={null}>
          <div>
            {name}
          </div>
        </InfoWindow>
      </Marker>
    );
  }
}

export default connect(null, actions)(MarkerComponent);
