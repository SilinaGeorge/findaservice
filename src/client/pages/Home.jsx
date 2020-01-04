import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import * as actions from "../actions";
import Header from "../components/common/Header.jsx";
import Appointments from "../components/Appointments.jsx";
import CommonForm from "../components/CommonForm.jsx";
import Geocode from "react-geocode";
import "../scss/Home.scss";

// Home page component
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.user.username
    };
    this.submitForm = this.submitForm.bind(this);
    this.displayAppointments = this.displayAppointments.bind(this);
    this.displayInfo = this.displayInfo.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.convertfromLat = this.convertfromLat.bind(this);
  }

  // get the users location when component mounts
  UNSAFE_componentWillMount() {
    console.log('here2')
    this.getLocation();
  }

  // function that gets the form values
  submitForm(values) {
    // store the values and navigate to the next page
    if (values.Service != undefined) {
      this.props.searchServices(values);
      this.props.history.push("/Discover");
    }
  }

  // display the appointments from the user
  displayAppointments = () => {
    const { username } = this.state;
    return <Appointments user={username} />;
  };

  // display te default home screen
  displayInfo = () => {
    return (
      <div>
        <h5>Search for services near you and book an appointment on the go!</h5>
        <h5>
          No more inconvenience of calling to schedule, we will do that for you!
        </h5>
        <img style={{width:'40vh', marginTop:'10vh'}} src={require("../media/target.png")}></img>
      </div>

       

    );
  };

  // try to get the current location of the user
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude)
        this.convertfromLat(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    }
  };

  // convert location into lat and long coordinates
  convertfromLat = (lat, long) => {
    Geocode.fromLatLng(lat, long).then(
      response => {
        const address = response.results[0].formatted_address;
        //this.setState({ address: address });
        const populateData = {
          // used to populate "account" reducer when "Load" is clicked,
          Location: address
        };
        // populate form
        this.props.populateforms(populateData);
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    return (
      <div>
        <Container className="container-row">
          <Row>
            <Col sm="4" className="left-container">
              <div className="left_title">
                <h2>Find a Service</h2>
                <h6>Helping you locate and schedule services.</h6>
              </div>
              <CommonForm
                inputs={["Service", "Location"]}
                btn="Start Searching"
                onSubmit={this.submitForm}
              />
            </Col>
            <Col sm="8" className="right-container">
              <Header showHome={false} />
              <div className="right_title">
                {this.props.user.username
                  ? this.displayAppointments()
                  : this.displayInfo()}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// get the reducer state
const mapStateToProps = state => {
  return {
    // users state object
    user: state.logged_in_user_info
  };
};

export default connect(mapStateToProps, actions)(Home);
