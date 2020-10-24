import axios from 'axios';
import { setAlert } from './alert'


import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types'

// GET current users profile
// BAD... export const getCurrentProfile = () => {....
// would lead to Errod: "Actions must be plain objects!""
// async is with babel changed so that it does not return always a plain object.
// Redux thunk ... kind of ... it can manually dispatch an action when the request is finished

export const getCurrentProfile = () => async dispatch => {   // short for ... function that returns a fuction

    try {
        const res = await axios.get('/api/profile/me');
        //here we manually dispatch with the middleware thunk it is ok to use async!
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Create or update Filter Profile
// history to push to the page before
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Profile Updated', 'success'));
        if (!edit) {
            history.push('/dashboard')
        }

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}