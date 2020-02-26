// import * as actionTypes from "../actions/types";
import { updateObject } from "../utility";


// const authStart = (state, action) => {
export const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
}


// const authSuccess = (state, action) => {
export const authSuccess = (state, action) => {
  // console.log(action);
  return updateObject(state, {
    token: action.user.token,
    username: action.user.username,
    userId: action.user.userId,
    jobtitle: action.user.jobtitle,
    department: action.user.department,
    error: null,
    loading: false
  });
}


// const authFail = (state, action) => {
export const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


// const authLogout = (state, action) => {
export const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    orgUserDetails: null
  })
}

