// import { combineReducers } from 'redux';
// import { updateObject } from "../utility";
import * as actionTypes from "../actions/types";

import {
  authStart,
  authSuccess,
  authFail,
  authLogout,
} from "./authReducers";

import {
  getOrgs,
  getOrgDetails,
  getOrgUserDetails,
  getOrgUsers,
  getBookings,
  getFilteredBookings,
  getResources,
  getResourceDetails,
  getUsers,
  getUserDetails,
  orgTaskError
} from "./orgTaskReducers";

const initialState = {
  token: null,
  username: null,
  userId: null,
  jobtitle: null,
  department: null,
  loading: false,

  error: null,

  orgList: null,
  orgDetails: null,
  orgUserDetails: null,
  orgUserList: null,
  bookingList: null,
  filteredBookingList: null,
  resourceList: null,
  resourceDetails: null,
  userList: null,
  userDetails: null
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START:   return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:    return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:  return authLogout(state, action);

    case actionTypes.GET_ORGS:              return getOrgs(state, action);
    case actionTypes.GET_ORG_DETAILS:       return getOrgDetails(state, action);
    case actionTypes.GET_ORG_USER_DETAIL:   return getOrgUserDetails(state, action);
    case actionTypes.GET_ORG_USERS:         return getOrgUsers(state, action);
    case actionTypes.GET_BOOKINGS:          return getBookings(state, action);
    case actionTypes.GET_FILTERED_BOOKINGS: return getFilteredBookings(state, action);
    case actionTypes.GET_RESOURCES:         return getResources(state, action);
    case actionTypes.GET_RESOURCE_DETAILS:  return getResourceDetails(state, action);
    case actionTypes.GET_USERS:             return getUsers(state, action);
    case actionTypes.GET_USER_DETAILS:      return getUserDetails(state, action);
    
    case actionTypes.ORG_TASK_ERROR: return orgTaskError(state, action);
    default:
      return state;
  }
}

export default reducer;
