import axios from "axios";
import {
  GET_STREAMS,
  LOGIN_USER,
  REGISTER_USER,
  SAVE_TIMES,
  LOGGED_IN_USER_INFO,
  UPDATE_SEARCH,
  LOGOUT_USER,
  VIEW_COMPANY_INFO,
  BOOK_APPOINTMENT,
  GET_APPOINTMENTS,
  DELETE_APPOINTMENTS,
  GET_COMPANY_INFO,
  UPDATE_APPOINTMENTS,
  RESET_APPOINTMENTS,
  LOAD_ACCOUNT
} from "./actionTypes";

//const url = "https://strawberryshortcakes.herokuapp.com";

const url = "http://localhost:3000";
// login the client
export function login(username, password) {
  const request = axios.post(url + "/api/login", {
    username,
    password
  });

  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({
          type: LOGIN_USER,
          payload: data
        });
        dispatch({
          type: LOGGED_IN_USER_INFO,
          payload: {
            username: data.username,
            service: data.service,
            facebook: data.facebook,
            name: data.name,
            phonenumber: data.phonenumber,
            email: data.email
          }
        });
      })
      .catch(function(error) {
        dispatch({ type: LOGIN_USER, payload: error.response.data });
      });
  };
}

// Signout the client
export function logout() {
  const request = axios.get(url + "/api/logout");

  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: LOGOUT_USER, payload: data });
      dispatch({
        type: LOGGED_IN_USER_INFO,
        payload: { username: undefined, service: undefined }
      });
    });
  };
}

// register the client
export function register(
  username,
  password,
  firstname,
  lastname,
  phonenumber,
  email,
  service
) {
  const request = axios.post(url + "/api/register", {
    username,
    password,
    firstname,
    lastname,
    phonenumber,
    email,
    service
  });
  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({
          type: LOGGED_IN_USER_INFO,
          payload: {
            username: data.username,
            service: data.service,
            facebook: data.facebook,
            name: data.name,
            phonenumber: data.phonenumber,
            email: data.email
          }
        });
        dispatch({ type: REGISTER_USER, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: REGISTER_USER, payload: error.response.data });
      });
  };
}

// register the client
export function loginFacebook(username, firstname, lastname, email) {
  const request = axios.post(url + "/api/login/facebook", {
    username,
    firstname,
    lastname,
    email
  });
  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({
          type: LOGGED_IN_USER_INFO,
          payload: {
            username: data.username,
            service: data.service,
            facebook: data.facebook,
            name: data.name,
            phonenumber: data.phonenumber,
            email: data.email
          }
        });
        dispatch({
          type: LOGIN_USER,
          payload: data
        });
      })
      .catch(function(error) {
        dispatch({ type: LOGIN_USER, payload: error.response.data });
      });
  };
}

// create record in appointment collection
export function saveCompanyData(timeArray, tagArray, companyArray, name) {
  const request = axios.post(url + "/api/services", {
    timeArray,
    tagArray,
    companyArray,
    name
  });
  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({ type: SAVE_TIMES, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: SAVE_TIMES, payload: error.response.data });
      });
  };
}

// create record in appointment collection
export function updateCompanyData(
  id,
  times,
  tags,
  company,
  address,
  description,
  phone
) {
  const request = axios.patch(url + "/api/services/" + id, {
    times,
    tags,
    company,
    address,
    description,
    phone
  });
  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({ type: SAVE_TIMES, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: SAVE_TIMES, payload: error.response.data });
      });
  };
}

// get all services given a service
export function searchServices(values) {
  const request = axios.get(url + "/api/services/" + values.Service);
  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({
          type: UPDATE_SEARCH,
          payload: data,
          values
        });
      })
      .catch(function(error) {
        dispatch({ type: UPDATE_SEARCH, payload: error.response.data });
      });
  };
}

// schedule appointment booking
export function bookAppointment(
  to,
  from,
  userId,
  serviceId,
  date,
  company,
  email,
  phonenumber,
  name,
  companyUsername
) {
  const request = axios.post(url + "/api/appointments", {
    to,
    from,
    userId,
    serviceId,
    date,
    company,
    email,
    phonenumber,
    name,
    companyUsername
  });
  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({ type: BOOK_APPOINTMENT, payload: data });
      })
      .catch(function(error) {
        dispatch({ type: BOOK_APPOINTMENT, payload: error.response.data });
      });
  };
}

// schedule appointments for userID
export function getAppointments(user) {
  const request = axios.get(url + "/api/appointments/" + user);
  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({
          type: GET_APPOINTMENTS,
          payload: data
        });
      })
      .catch(function(error) {
        dispatch({ type: GET_APPOINTMENTS, payload: error.response.data });
      });
  };
}

// get company info
export function getCompanyInfo(user) {
  const request = axios.get(url + "/api/services/username/" + user);
  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({
          type: GET_COMPANY_INFO,
          payload: data
        });
      })
      .catch(function(error) {
        dispatch({ type: GET_COMPANY_INFO, payload: error.response.data });
      });
  };
}

// get appointments for serviceID
export function getAppointmentsCompany(company) {
  const request = axios.get(url + "/api/appointments/company/" + company);
  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({
          type: GET_APPOINTMENTS,
          payload: data
        });
      })
      .catch(function(error) {
        dispatch({ type: GET_APPOINTMENTS, payload: error.response.data });
      });
  };
}

// get appointments for companyUsername
export function getAppointmentsCompanyUsername(companyUsername) {
  const request = axios.get(
    url + "/api/appointments/company/user/" + companyUsername
  );
  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({
          type: GET_APPOINTMENTS,
          payload: data
        });
      })
      .catch(function(error) {
        dispatch({ type: GET_APPOINTMENTS, payload: error.response.data });
      });
  };
}

// cancel appointment booking
export function cancelAppointments(id) {
  const request = axios.delete(url + "/api/appointments/" + id);
  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({
          type: DELETE_APPOINTMENTS,
          payload: data
        });
      })
      .catch(function(error) {
        console.log(error);
        // dispatch({ type: DELETE_APPOINTMENTS, payload: error });
      });
  };
}

// cancel appointment booking
export function populateforms(data) {
  return {
    type: LOAD_ACCOUNT,
    payload: data
  };
}
