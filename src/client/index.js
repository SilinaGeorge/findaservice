import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import App from "./components/App.jsx";
import { HashRouter } from "react-router-dom";
import styles from "./scss/application.scss";
// Libraries
import "bootstrap/dist/css/bootstrap.css";

render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
