import { LOGGED_IN_USER_INFO } from "../actions/actionTypes";

// returns the state of the path of the selected image
export default (state = {}, action) => {
  switch (action.type) {
    case LOGGED_IN_USER_INFO:
      return action.payload;
    default:
      return state;
  }
};
