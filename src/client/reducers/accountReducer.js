import { LOAD_ACCOUNT } from "../actions/actionTypes";

// returns the state of the path of the selected image
export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_ACCOUNT:
      return {
        data: action.payload
      };
    default:
      return state;
  }
};
