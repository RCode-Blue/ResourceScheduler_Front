// import * as actionTypes from "../actions/types";
import { updateObject } from "../utility";


export const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
}

export const authSuccess = (state, action) => {
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


export const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}


export const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    orgUserDetails: null
  })
}

