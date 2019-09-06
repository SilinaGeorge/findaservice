import {
  LOGIN_USER,
  REGISTER_USER,
  LOGGED_IN_USER,
  LOGOUT_USER
} from "../actions/actionTypes";

// returns the state of the path of the selected image
export default (state = [], action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;
    case REGISTER_USER:
      return action.payload;
    case LOGOUT_USER:
      return action.payload;
    default:
      return state;
  }
};
