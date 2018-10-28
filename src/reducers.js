import { combineReducers } from 'redux'
import {
  LOGIN,
  REGISTER,
  FETCH_CURRENT_USER,
  LOGOUT,
  REGISTER_DEVICE,
  FETCH_DEVICE_LIST,
  FETCH_DEVICE
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
    default:
      return state
  }
}

function currentDevice(state = null, action) {
  switch (action.type) {
    case `${FETCH_DEVICE}_FULFILLED`:
      return action.payload.body.device;
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
  currentUser
})
