import axios from 'axios';
import * as actionTypes from "./types";


export const orgTaskError = (error) => {
  return {
    type: actionTypes.ORG_TASK_ERROR,
    error: error
  }
}

// #region Bookings
export const getBookings = () => {
  return dispatch => {
    // axios.get('http://127.0.0.1:8000/api/bookings/')
    axios.get('/api/bookings/')
    .then( res => {
      // console.log(res.data);
      dispatch({
        type: actionTypes.GET_BOOKINGS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(orgTaskError(err))
    });
  }
}


export const getFilteredBookings = (resourceid) => {
  return dispatch => {
    // axios.get(`http://127.0.0.1:8000/api/bookings/filtered/${resourceid}/`)
    axios.get(`/api/bookings/filtered/${resourceid}/`)
    .then( res => {
      // console.log(res.data);
      dispatch({
        type: actionTypes.GET_FILTERED_BOOKINGS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(orgTaskError(err))
    });
  }
}

// #endregion


// #region Organisation
export const getOrgs = () => {
  return dispatch => {
    // axios.get('http://127.0.0.1:8000/api/org/')
    axios.get('/api/org/')
    .then( res => {
      dispatch({ 
        type: actionTypes.GET_ORGS, 
        payload: res.data 
      })
    })
    .catch(err => {
      dispatch(orgTaskError(err))
    });
  }
}


export const getOrgDetails = (id) => {
  return dispatch => {
    // axios.get(`http://127.0.0.1:8000/api/org/${id}/`)
    axios.get(`/api/org/${id}/`)
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: actionTypes.GET_ORG_DETAILS,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch(orgTaskError(err))
    });
  }
}



// #endregion


// #region OrgUsers
export const getOrgUsers = () => {
  return dispatch => {
    // axios.get("http://127.0.0.1:8000/api/orgusers/")
    axios.get("/api/orgusers/")
    .then(res => {
      dispatch({
        type: actionTypes.GET_ORG_USERS,
        payload: res.data
      })
    })
    .catch(err=>{
      dispatch(orgTaskError(err))
    });
  }
}


export const getOrgUserDetails = (id) => {
  // console.log(id);
 
  return dispatch => {
    // axios.get(`http://127.0.0.1:8000/api/orgusers/user/${id}/`)
    axios.get(`/api/orgusers/user/${id}/`)
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: actionTypes.GET_ORG_USER_DETAIL,
        payload: res.data
      })
    })
    .catch(err=>{
      dispatch(orgTaskError(err))
    });
  }
}

// #endregion


// #region Resources

export const getResources = () => {
  return dispatch => {
    // axios.get('http://127.0.0.1:8000/api/resources/')
    axios.get('/api/resources/')
    .then( res => {
      // console.log(res.data);
      dispatch({
        type: actionTypes.GET_RESOURCES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(orgTaskError(err))
    });
  }
}

export const getResourceDetails = (id) => {
  return dispatch => {
    // axios.get(`http://127.0.0.1:8000/api/resources/${id}/`)
    axios.get(`/api/resources/${id}/`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_RESOURCE_DETAILS,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch(orgTaskError(err))
    });
  }
}

// #endregion


// #region Users

export const getUsers = () => {
  return dispatch => {
    // axios.get('http://127.0.0.1:8000/api/users/')
    axios.get('/api/users/')
    .then(res => {
      // console.log(res);
      dispatch({
        type: actionTypes.GET_USERS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(orgTaskError(err))
    });
  }
}

export const getUserDetails = (id) => {
  return dispatch => {
    // axios.get(`http://127.0.0.1:8000/api/users/${id}/`)
    axios.get(`/api/users/${id}/`)
    .then(res => {
      // console.log(res);
      dispatch({
        type: actionTypes.GET_USER_DETAILS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(orgTaskError(err))
    });
  }
}

export const putUserDetails = (id, userDetails) => {
  return dispatch => {
    // axios.put(`http://127.0.0.1:8000/api/users/${id}/`, userDetails)
    axios.put(`/api/users/${id}/`, userDetails)
    .then(res => {
      // console.log(res)
    })
    .catch(err => {
      dispatch(orgTaskError(err))
    });
  }
}
// #endregion
