import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import Header from "../components/common/Header.jsx";
import NotFound from "../components/common/NotFound.jsx";
import Map from "../components/Map.jsx";
import "../scss/Discover.scss";
import Geocode from "react-geocode";

// Discover page component to display services
class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: props.services,
      results: props.services.data.length,
      lat: 0,
      lng: 0,
      pos: []
    };
    Geocode.setApiKey("AIzaSyA0UqHNnf_ORk0hYHxpplvfG9Ke9wsSNcA"); 

    this.displaySearchData = this.displaySearchData.bind(this);
    this.showEmpty = this.showEmpty.bind(this);
    this.getMapClicked = this.getMapClicked.bind(this);
    this.convertfromAddress = this.convertfromAddress.bind(this);
    this.convertfromLat = this.convertfromLat.bind(this);
  }

  UNSAFE_componentWillMount() {
        // set our api key
        Geocode.setApiKey("AIzaSyA0UqHNnf_ORk0hYHxpplvfG9Ke9wsSNcA"); 
  }

  // Get latidude & longitude from address.
  convertfromAddress = (address, info) => {
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        // set the maps searched location
        if (info == undefined) {
          this.setState({ lat, lng });
        } else {
          // add marker postions to array
          const tempPos = this.state.pos;
          tempPos.push({ _id: info._id, lat, lng, name: info.company });
          this.setState({ pos: tempPos });
        }
      },
      error => {
        console.error(error);
      }
    );
  };

  // Get address from latidude & longitude.
  convertfromLat = (lat, long) => {
    Geocode.fromLatLng(lat, long).then(
      response => {
        const address = response.results[0].formatted_address;
      },
      error => {
        console.error(error);
      }
    );
  };

  // redraw component if prev location/service updates
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.lat !== nextState.lat ||
      this.state.lng !== nextState.lng ||
      this.props.services !== nextProps.services
    );
  }

  // update the state if the props update
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.services !== nextProps.services) {
      this.setState({ services: nextProps.services });
      this.setState({ results: nextProps.services.data.length });
      this.convertfromAddress(nextProps.services.location);
      this.setState({ pos: [] });
    }
  }

  // make into seperate component
  displaySearchData = () => {
    let services = this.state.services.data;
    // if there is data to display
    if (services != undefined) {
      return services.map(data => {
        //push data to pos
        if (data.address != undefined) {
          this.convertfromAddress(data.address, data);
        }
        return (
          <ListGroupItem
            key={
              "" +
              new Date().getMilliseconds() +
              Math.floor(Math.random() * 1000)
            }
            onClick={() =>
              this.props.history.push({
                pathname: "/ViewCompanyInfo",
                state: { detail: data }
              })}
            tag="button"
            action
          >
            {data.company}
          </ListGroupItem>
        );
      });
    }
  };

  // show the not found message
  showEmpty = () => {
    if (this.state.services.service == "") return null;
    return <NotFound result={this.state.services.service} />;
  };

  // callback for the map
  getMapClicked(name) {
    //console.log(name);
  }

  render() {
    return (
      <div className="map-container">
        <Header search={true} />
        <Row>
          <Col xs="14" sm="9" className="map">
            <Map
              pos={this.state.pos}
              lat={this.state.lat}
              lng={this.state.lng}
              callback={this.getMapClicked}
            />
          </Col>
          <Col sm="3" className="map-list-container">
            <h5>Search Results:</h5>
            <ListGroup className="map-list">
              {this.state.results > 0
                ? this.displaySearchData()
                : this.showEmpty()}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

// get the reducer state
const mapStateToProps = state => {
  return {
    // users state object
    services: state.search
  };
};

export default connect(mapStateToProps, actions)(Discover);
