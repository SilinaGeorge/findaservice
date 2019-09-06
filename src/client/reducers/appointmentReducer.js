import {
  GET_APPOINTMENTS,
  BOOK_APPOINTMENT,
  DELETE_APPOINTMENTS,
  UPDATE_APPOINTMENTS
} from "../actions/actionTypes";

const initialState = {
  status: "",
  appointments: []
};

// initial state is empty  array of appointments
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return Object.assign({}, state, {
        appointments: action.payload.appointments,
        status: ""
      });
    case BOOK_APPOINTMENT:
      return Object.assign({}, state, {
        status: action.payload.message
      });
    case UPDATE_APPOINTMENTS:
      return Object.assign({}, state, {
        appointments: [...state.appointments, ...action.payload.appointments],
        status: ""
      });
    case DELETE_APPOINTMENTS:
      // find the index of the object
      let index = state.appointments.findIndex(
        x => x._id == action.payload._id
      );
      let newarry = state.appointments
        .slice(0, index)
        .concat(state.appointments.slice(index + 1, state.appointments.length));
      return Object.assign({}, state, {
        appointments: newarry,
        status: ""
      });
    default:
      return state;
  }
};
