import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { Container, Row, Col } from "reactstrap";
import Header from "../components/common/Header.jsx";
import Btn from "../components/common/Btn.jsx";
import Alert from "../components/common/Alert.jsx";
import TimeForm from "../components/TimeForm.jsx";
import TimeSlots from "../components/common/TimeSlots.jsx";
import CommonForm from "../components/CommonForm.jsx";
import "../scss/Company.scss";

// Component that gets company infromation
class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: [], // array of time objects { to, from }
      tags: [], // array of company tags
      info: [], // array of company info objects
      tag: "",
      showAlert: false,
      message: ""
    };
    this.saveTimes = this.saveTimes.bind(this);
    this.saveInfo = this.saveInfo.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleChangeTagInput = this.handleChangeTagInput.bind(this);
    this.deleteTimeIndex = this.deleteTimeIndex.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let data = this.props.companyInfo.data;
    if (data != prevProps.companyInfo.data && data) {
      let split_address = data.address.split(", ");
      const populateData = {
        // used to populate "account" reducer when "Load" is clicked
        Address: split_address[1],
        Country: split_address[0],
        City: split_address[2],
        State: split_address[3],
        Description: data.description,
        Company: data.company,
        Phone: data.phone,
        Zip: split_address[4]
      };
      // populate form
      this.props.populateforms(populateData);
      this.setState({ time: data.times });
      this.setState({ tags: data.tags });
    }
  }

  componentDidMount() {
    if (this.props.history.location.query.edit) {
      this.props.getCompanyInfo(this.props.user.username);
    }
  }

  // clear the form once dom unmounts
  componentWillUnmount() {
    this.props.populateforms({});
  }

  // handle the tag inputs
  handleTagChange(tags) {
    this.setState({ tags });
  }

  handleChangeTagInput(tag) {
    this.setState({ tag });
  }

  // function that gets the id of the time selected
  deleteTimeIndex = id => {
    let times = this.state.time;
    // find the index of the time id
    let index = times.findIndex(x => x.id == id);
    // remove from the array
    let newarry = times
      .slice(0, index)
      .concat(times.slice(index + 1, times.length));
    // update the times
    this.setState({ time: newarry });
  };

  // get the times entered
  saveTimes(from, to, id) {
    const tempArry = this.state.time;
    // check to see if company reaches slot limit
    if (from != "null null" && to != "null null") {
      tempArry.push({
        to,
        from,
        id
      });
      this.setState({ time: tempArry });
    } else {
      this.setState({
        showAlert: !this.state.showAlert,
        message: "Please select a time"
      });
    }
  }

  // get the company info
  saveInfo(values) {
    const {
      Address,
      Country,
      City,
      State,
      Description,
      Company,
      Phone
    } = values;
    // create the address object
    const newAddress =
      Country + ", " + Address + ", " + City + ", " + State + ", " + values.Zip;
    this.setState({
      info: {
        Company,
        Description,
        Phone,
        Address: newAddress
      }
    });
  }

  // store the company info into the database
  saveData = () => {
    const { time, tags, info } = this.state;
    // only save if company data is inputed
    if (info.Company != null) {
      // add the company name to tags
      tags.push(info.Company);
      // add each word of the company name into tags
      const newTags = tags.concat(info.Company.split(" "));
      this.props.saveCompanyData(time, newTags, info, this.props.user.username);
      // navigate back to home
      this.props.history.push("/");
    } else {
      this.setState({
        showAlert: !this.state.showAlert,
        message: "Please save company information"
      });
    }
  };

  // store the company info into the database
  updateData = () => {
    const { time, tags, info } = this.state;
    // only save if company data is inputed
    if (info.Company != null) {
      this.props.updateCompanyData(
        this.props.companyInfo.data._id,
        time,
        tags,
        info.Company,
        info.Address,
        info.Description,
        info.Phone,
        this.props.user.username
      );
      // navigate back to home
      this.props.history.push("/");
    } else {
      this.setState({
        showAlert: !this.state.showAlert,
        message: "Please save company information"
      });
    }
  };

  displayNewServiceMessage = () => {
    return (
      <div>
        <h3>
          Account created, welcome {this.props.user.username}.
        </h3>
        <p>Please fill in your information</p>
      </div>
    );
  };

  displaySettingsMessage = () => {
    return (
      <div>
        <h3>
          {this.props.user.username}'s Settings
        </h3>
        <p>Edit information</p>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Container>
          {this.state.showAlert ? <Alert message={this.state.message} /> : null}
          <Row>
            <Col sm={{ size: 8, order: 2, offset: 1 }} className="title">
              <div className="icon">
                <img src={require("../media/checked.png")} />
              </div>
              {this.props.history.location.query.edit
                ? this.displaySettingsMessage()
                : this.displayNewServiceMessage()}
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="9" className="company-card">
              <p className="subtitle">Company Name:</p>
              <CommonForm
                inputs={[
                  "Company",
                  "Country",
                  "Phone",
                  "Address",
                  "City",
                  "State",
                  "Zip",
                  "Description"
                ]}
                btn="Save Company Details"
                formStyle="row"
                dark="dark"
                onSubmit={this.saveInfo}
              />
            </Col>
            <Col sm="3" className="btn-container">
              <Btn
                id="saveAndContinue"
                size={"lg"}
                color={"secondary"}
                onClick={
                  this.props.history.location.query.edit
                    ? this.updateData
                    : this.saveData
                }
              >
                Save and Continue
              </Btn>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="9" className="company-card">
              <p className="subtitle">Availability:</p>
              <TimeForm onSubmit={this.saveTimes} />
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="9" className="time-slots">
              <TimeSlots
                onClick={this.deleteTimeIndex}
                times={this.state.time}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="9" className="company-card">
              <p className="subtitle">Tags:</p>
              <TagsInput
                value={this.state.tags}
                onChange={this.handleTagChange}
                inputValue={this.state.tag}
                onChangeInput={this.handleChangeTagInput}
              />
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
    user: state.logged_in_user_info,
    companyInfo: state.service
  };
};

export default connect(mapStateToProps, actions)(Company);
