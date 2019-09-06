import { UPDATE_SEARCH } from "../actions/actionTypes";

const initialState = {
  service: "",
  location: "",
  data: []
};

// returns the state of the path of the selected image
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH:
      return Object.assign({}, state, {
        location: action.values.Location,
        data: action.payload.data,
        service: action.values.Service
      });
    default:
      return state;
  }
};
