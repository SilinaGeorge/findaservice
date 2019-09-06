// https://stackoverflow.com/questions/3231459/create-unique-id-with-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
import React, { Component } from "react";
import Header from "../components/common/Header.jsx";
import { Row, Col } from "reactstrap";
import "../scss/Label.scss";

// Credit page
class Credits extends Component {
  render() {
    return (
      <div>
        <main>
          <Header />
          <div className="credits">
            <h2 className="Auth-title">Credits</h2>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <h5>Icons made by</h5>
                <div className="creidt-links">
                  <a
                    href="https://www.flaticon.com/authors/eleonor-wang"
                    title="Eleonor Wang"
                  >
                    Eleonor Wang
                  </a>
                  from
                  <a href="https://www.flaticon.com/" title="Flaticon">
                    www.flaticon.com
                  </a>
                  is licensed by
                  <a
                    href="http://creativecommons.org/licenses/by/3.0/"
                    title="Creative Commons BY 3.0"
                    target="_blank"
                  >
                    CC 3.0 BY
                  </a>
                </div>
                <div className="creidt-links"><a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                <div className="creidt-links"><a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <h5>Ohter Resources:</h5>
                <div className="creidt-links">
                  <a href="https://stackoverflow.com/" title="Stackoverflow">
                    Stackoverflow
                  </a>
                </div>
                <div className="creidt-links">
                  <a href="https://github.com/tomchentw/react-google-maps" title="reactmaps">
                    React Google Maps
                  </a>
                </div>
                <div className="creidt-links">
                  <a href="https://medium.com/@Keithweaver_/getting-started-with-mern-mongodb-express-js-react-js-node-js-94197841bdf4" title="Heroku">
                    MERN Stack tutorial
                  </a>
                </div>
                <div className="creidt-links">
                  <a href="https://medium.com/@katestamas/heroku-deployment-with-react-node-mongoose-and-webpack-ff37bd80d7af" title="Heroku">
                    Heroku Deploy Tutorial
                  </a>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <h5>Developers:</h5>
                <div className="creidt-devs">
                  <h6>Osama Alhaq</h6>
                  <h6>Fauzan Kadri</h6>
                  <h6>Silina George</h6>
                </div>
              </Col>
            </Row>
          </div>
        </main>
      </div>
    );
  }
}

export default Credits;
