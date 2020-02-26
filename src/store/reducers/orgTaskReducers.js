import { updateObject } from "../utility";



// #region Utility
export const orgTaskError = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
}
// #endregion


// #region Bookings
export const getBookings = (state, action) => {
  return updateObject(state, {
    bookingList: action.payload
  });
}

export const getFilteredBookings = (state,action) => {
  return updateObject(state, {
    filteredBookingList: action.payload
  });
}
// #endregion


// #region Organisation
export const getOrgs = (state, action) => {
  return updateObject(state, {
    orgList: action.payload
  });
}

export const getOrgDetails = (state, action) => {
  return updateObject(state, {
    orgDetails: action.payload
  });
}
// #endregion


// #region OrgUsers
export const getOrgUserDetails = (state, action) => {
  return updateObject(state, {
    orgUserDetails: action.payload
  });
}

export const getOrgUsers = (state,action) => {
  return updateObject(state, {
    orgUserList: action.payload
  });
}
// #endregion


// #region Resources
export const getResources = (state, action) => {
  return updateObject(state, {
    resourceList: action.payload
  });
}

export const getResourceDetails = (state, action) => {
  return updateObject(state, {
    resourceDetails: action.payload
  });
}
// #endregion


// #region Users
export const getUserDetails = (state, action) => {
  return updateObject(state, {
    userDetails: action.payload
  });
}

export const getUsers = (state, action) => {
  return updateObject(state, {
    userList: action.payload
  });
}


// #endregion