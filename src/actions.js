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

/*
 * Synchronous Action Creators
 */

export function logout() {
  localStorage.clear();

  return {
    type: LOGOUT
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
