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
  FETCH_LOCATION_LIST,
  FETCH_LIVE_LOCATION_LIST
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
      return action.payload.body.user;
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
    default:
      return state
  }
}

function currentLocations(state = null, action) {
  switch (action.type) {
    case `${FETCH_LOCATION_LIST}_FULFILLED`:
      return action.payload.body.locations;
    default:
      return state
  }
}

function liveLocations(state = null, action) {
  switch (action.type) {
    case `${FETCH_LIVE_LOCATION_LIST}_FULFILLED`:
      return action.payload.body.deviceLocations;
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
  currentLocations,
  liveLocations
})
