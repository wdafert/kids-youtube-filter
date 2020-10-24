import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    KIDS_MODE_ON,
    KIDS_MODE_OFF
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    kidsMode: true
}

export default function (state = initialState, action) {  // the very first time the reducer gets called it will use this default state. Otherwise it would be undefined and lead to error.
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };

        case REGISTER_SUCCESS:   // we want the user to be logged in right away if the registration was success}
        case LOGIN_SUCCESS:   //
            localStorage.setItem('token', payload.token);   //writes on the client the toekn into the local browser storage
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                kidsMode: false
            };

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case AUTH_ERROR:    //fall through for both errors
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }

        case KIDS_MODE_ON:   //

            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                kidsMode: true
            };

        case KIDS_MODE_OFF:   //
            // might be needed to write status to local storage... localStorage.setItem('token', payload.token);   //writes on the client the toekn into the local browser storage
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                kidsMode: false
            };

        // always include default that returns the state! if a reducer returns undefined -> error
        default:
            return state;
    }
}