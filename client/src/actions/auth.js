import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    KIDS_MODE_ON,
    KIDS_MODE_OFF
} from './types';

// Kids Mode on
export const kidsModeOn = () => dispatch => {
    dispatch({ type: KIDS_MODE_ON });
}

// Kids Mode on
export const kidsModeOff = () => dispatch => {
    dispatch({ type: KIDS_MODE_OFF });
}

// Load User
export const loadUser = () => async dispatch => {
    //if there is a token stored locally then ..
    if (localStorage.token) {
        setAuthToken(localStorage.token)   // add token to header
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({                      // saves result of user in storage+set isAuthenticated TRUE and loading FALSE
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


// Register User

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser()); //???
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Login User

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser()); //???

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Logout   / Clear Profile

export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT })
}
