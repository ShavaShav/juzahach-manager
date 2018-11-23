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

export const FETCH_DEVICE_LOCATION_LIST = 'FETCH_DEVICE_LOCATION_LIST';
export const FETCH_USER_LOCATION_LIST = 'FETCH_USER_LOCATION_LIST';

export const SET_MODE = 'SET_MODE';
export const SET_LIVE_UPDATE_SPEED = 'SET_LIVE_UPDATE_SPEED';
export const SET_LIVE_TRAIL_LENGTH = 'SET_LIVE_TRAIL_LENGTH';
export const SET_HISTORY_START = 'SET_HISTORY_START';
export const SET_HISTORY_END = 'SET_HISTORY_END';

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

export function setMode(mode) {
  return {
    type: SET_MODE,
    mode: mode
  }
}

export function setLiveUpdateSpeed(updatesPerMin) {
  return {
    type: SET_LIVE_UPDATE_SPEED,
    updatesPerMin: updatesPerMin
  }
}

export function setLiveTrailLength(trailLength) {
  return {
    type: SET_LIVE_TRAIL_LENGTH,
    trailLength: trailLength
  }
}

export function setHistoryStart(time) {
  return {
    type: SET_HISTORY_START,
    time: time
  }
}

export function setHistoryEnd(time) {
  return {
    type: SET_HISTORY_END,
    time: time
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
    });
  }
}

export function login(email, password) {
  return dispatch => {
    dispatch({ 
      type: LOGIN,
      payload: api.User.login(email, password)
    });
  }
}

export function register(username, email, password) {
  return dispatch => {
    dispatch({ 
      type: REGISTER,
      payload: api.User.register(username, email, password)
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

export function fetchLocationHistory(deviceId, start, end) {
  return dispatch => {
    dispatch({ 
      type: FETCH_DEVICE_LOCATION_LIST,
      payload: api.Device.locations(deviceId, undefined, start, end)
    });
  }
}

export function fetchLiveLocations(limit, start, end) {
  return dispatch => {
    dispatch({ 
      type: FETCH_USER_LOCATION_LIST,
      payload: api.User.locations(limit, start, end)
    });
  }
}
