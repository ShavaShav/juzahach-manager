import api from './api';

/**
 * Refs
 * https://redux.js.org/basics/actions
 * https://www.npmjs.com/package/redux-promise-middleware
 */

/*
 * Action Types
 */

export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

export const REGISTER_DEVICE = 'REGISTER_DEVICE';
export const EDIT_DEVICE = 'EDIT_DEVICE';
export const FETCH_DEVICE = 'FETCH_DEVICE';
export const FETCH_DEVICE_LIST = 'FETCH_DEVICE_LIST';
export const SET_CURRENT_DEVICE = 'SET_CURRENT_DEVICE';

export const FETCH_LOCATION_LIST = 'FETCH_LOCATION_LIST';

/*
 * Synchronous Action Creators
 */

export function logout() {
  localStorage.clear();

  return {
    type: LOGOUT
  }
}

export function setCurrentDevice(device) {
  return {
    type: SET_CURRENT_DEVICE,
    device: device
  }
}

/*
 * Async Action Creators
 */

export function fetchCurrentUser() {
  return dispatch => {
    dispatch({ 
      type: FETCH_CURRENT_USER,
      payload: api.User.current()
    }).then(res => {
      localStorage.setItem('token', res.value.body.user.token);
    });
  }
}

export function login(email, password) {
  return dispatch => {
    dispatch({ 
      type: LOGIN,
      payload: api.User.login(email, password)
    }).then(res => {
      localStorage.setItem('token', res.value.body.user.token);
    });
  }
}

export function register(username, email, password) {
  return dispatch => {
    dispatch({ 
      type: REGISTER,
      payload: api.User.register(username, email, password)
    }).then(res => {
      localStorage.setItem('token', res.value.body.user.token);
    });
  }
}

export function registerDevice() {
  return dispatch => {
    dispatch({ 
      type: REGISTER_DEVICE,
      payload: api.Device.register()
    });
  }
}

export function fetchDevice(id) {
  return dispatch => {
    dispatch({ 
      type: FETCH_DEVICE,
      payload: api.Device.get(id)
    });
  }
}

export function fetchDeviceList() {
  return dispatch => {
    dispatch({ 
      type: FETCH_DEVICE_LIST,
      payload: api.Device.all()
    });
  }
}

export function editDevice(id, changes) {
  return dispatch => {
    dispatch({ 
      type: EDIT_DEVICE,
      payload: api.Device.update(id, changes)
    });
  }
}

export function fetchLocations(deviceId, limit, start, end) {
  return dispatch => {
    dispatch({ 
      type: FETCH_LOCATION_LIST,
      payload: api.Device.locations(deviceId, limit, start, end)
    });
  }
}
