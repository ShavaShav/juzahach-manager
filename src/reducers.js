import { combineReducers } from 'redux'
import {
  LOGIN,
  REGISTER,
  FETCH_CURRENT_USER,
  LOGOUT,
  REGISTER_DEVICE,
  FETCH_DEVICE_LIST,
  FETCH_DEVICE,
  EDIT_DEVICE,
  SET_CURRENT_DEVICE,
  FETCH_USER_LOCATION_LIST,
  FETCH_DEVICE_LOCATION_LIST,
  SET_MODE,
  SET_LIVE_TRAIL_LENGTH,
  SET_LIVE_UPDATE_SPEED,
  SET_HISTORY_START,
  SET_HISTORY_END
} from './actions'

/**
 * Refs
 * https://redux.js.org/basics/reducers
 * 
 * Reducers define how state is changed, given an action.
 * For ex. when user is logged in/out (action), we toggle currentUser (state)
 * When an action is dispatched in redux, these functions intercept.
 */

function currentUser(state = null, action) {
  switch (action.type) {
    case `${LOGIN}_FULFILLED`:
    case `${REGISTER}_FULFILLED`:
    case `${FETCH_CURRENT_USER}_FULFILLED`:
      // Set the local storage before setting user state
      const user = action.payload.body.user;
      localStorage.setItem('token', user.token);
      return user;
    case `${LOGIN}_REJECTED`:
    case `${REGISTER}_REJECTED`:
      return {
        errors: action.payload.body.errors
      }
    case LOGOUT:
      return null; // no user
    default:
      return state
  }
}

function deviceList(state = null, action) {
  switch (action.type) {
    case `${FETCH_DEVICE_LIST}_FULFILLED`:
      return action.payload.body.devices;
    case `${EDIT_DEVICE}_FULFILLED`:
      // Replace the device with the updated device from server
      const receivedDevice = action.payload.body.device;
      return state.map((device) => 
        device.id === receivedDevice.id ? receivedDevice : device
      );
    case LOGOUT:
      return null; // reinitialize state
    default:
      return state
  }
}

function currentDevice(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_DEVICE:
      return action.device;
    case `${FETCH_DEVICE}_FULFILLED`:
      return action.payload.body.device;
    case LOGOUT:
      return null; // reinitialize state
    default:
      return state
  }
}

function live(state = {trailLength: 3, updatesPerMin: 10}, action) {
  switch (action.type) {
    case `${FETCH_USER_LOCATION_LIST}_FULFILLED`:
      return {
        ...state,
        locations: action.payload.body.deviceLocations
      };
    case SET_LIVE_TRAIL_LENGTH:
      return {
        ...state,
        trailLength: action.trailLength
      };
    case SET_LIVE_UPDATE_SPEED:
      return {
        ...state,
        updatesPerMin: action.updatesPerMin
      };
    case LOGOUT:
      return {trailLength: 3, updatesPerMin: 10}; // reinitialize state
    default:
      return state
  }
}

function history(state = {}, action) {
  switch (action.type) {
    case `${FETCH_DEVICE_LOCATION_LIST}_FULFILLED`:
      return {
        ...state,
        locations: action.payload.body.locations
      };
    case SET_HISTORY_START:
      return {
        ...state,
        start: action.time
      };
    case SET_HISTORY_END:
      return {
        ...state,
        end: action.time
      };
    case LOGOUT:
      return {}; // reinitialize state
    default:
      return state
  }
}

function mode(state = 'LIVE', action) {
  switch (action.type) {
    case SET_MODE:
      return action.mode;
    case LOGOUT:
      return 'LIVE'; // reinitialize state
    default:
      return state
  }
}

function accessCode(state = null, action) {
  switch (action.type) {
    case `${REGISTER_DEVICE}_PENDING`:
      return 'PENDING'; // loading state
    case `${REGISTER_DEVICE}_FULFILLED`:
      return action.payload.body.accessCode;
    case `${REGISTER_DEVICE}_REJECTED`:
    case LOGOUT:
      return ''; // reset access code
    default:
      return state
  }
}

export default combineReducers({
  accessCode,
  deviceList,
  currentDevice,
  currentUser,
  live,
  history,
  mode
})
