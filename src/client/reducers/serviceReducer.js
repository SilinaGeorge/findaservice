import { GET_COMPANY_INFO } from "../actions/actionTypes";

// returns the state of the path of the selected image
export default (state = {}, action) => {
  switch (action.type) {
    case GET_COMPANY_INFO:
      return action.payload;
    default:
      return state;
  }
};
