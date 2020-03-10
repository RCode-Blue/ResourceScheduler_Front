import axios from 'axios';
import * as actionTypes from "./types";


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user: user
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}


export const authLogin = (username, password) => {
    return dispatch => {
        const user = {
            "username":username,
            "password":password
        }
        dispatch(authStart()); // Announce start of authentication process
        // axios.post('http://127.0.0.1:8000/rest-auth/login/', user)  // do a POST
        axios.post('https://serene-dusk-06086.herokuapp.com/rest-auth/login/', user)  // do a POST
        .then(res => {                                              // get response & do something with it
            // console.log(res);
            const user = {
                token: res.data.key,
                "username":username, 
                "userId":res.data.user,
                "email":res.data.user_data.email,
                "first_name":res.data.user_data.first_name,
                "middle_name":res.data.user_data.middle_name,
                "last_name":res.data.user_data.last_name,
                "preferred_name":res.data.user_data.preferred_name,
                "expirationDate": new Date(new Date().getTime() + 3600 * 1000)
            }

            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(user));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (
    username, email, password1, password2, first_name, middle_name, last_name, preferred_name) => {
    return dispatch => {
        dispatch(authStart());
        const user = {
            "username":username,
            "email":email, 
            "password1":password1,
            "password2":password2,
            "first_name":first_name, 
            "middle_name":middle_name,
            "last_name":last_name,
            "preferred_name":preferred_name
        }
        // axios.post('http://127.0.0.1:8000/rest-auth/registration/', user)
        axios.post('https://serene-dusk-06086.herokuapp.com/rest-auth/registration/', user)
        .then(res => {
            const user = {
                "token": res.data.key,
                "username":username, 
                "userId":res.data.user,
                "email":res.data.user_data.email,
                "first_name":res.data.user_data.first_name,
                "middle_name":res.data.user_data.middle_name,
                "last_name":res.data.user_data.last_name,
                "preferred_name":res.data.user_data.preferred_name,
                "photo":res.data.user_data.photo,
                "dob":res.data.user_data.dob,
                "expirationDate": new Date(new Date().getTime() + 3600 * 1000)
            }
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(authSuccess(user));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}


export const authCheckState = () => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user === undefined || user === null) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(user.expirationDate);
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(user));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}
