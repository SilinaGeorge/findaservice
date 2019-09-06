import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import Company from "./pages/Company.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Discover from "./pages/Discover.jsx";
import Register from "./pages/Register.jsx";
import Credits from "./pages/Credits.jsx";
import ViewCompanyInfo from "./pages/ViewCompanyInfo.jsx";

// Define the path to each page
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Company/" component={Company} />
      <Route path="/Company/:edit" component={Company} />
      <Route path="/Login" component={Login} />
      <Route path="/Discover" component={Discover} />
      <Route path="/Register" component={Register} />
      <Route path="/Credits" component={Credits} />
      <Route path="/ViewCompanyInfo" component={ViewCompanyInfo} />
    </Switch>
  );
};

export default Routes;
