import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import searchReducer from "./searchReducer";
import loginRegReducer from "./loginRegReducer";
import infoReducer from "./infoReducer";
import appointmentReducer from "./appointmentReducer";
import accountReducer from "./accountReducer";
import serviceReducer from "./serviceReducer";

export default combineReducers({
  form: formReducer,
  search: searchReducer,
  login: loginRegReducer,
  logged_in_user_info: infoReducer,
  appointments: appointmentReducer,
  service: serviceReducer,
  account: accountReducer
});
