import {
    GET_VIDEOS,
    VIDEO_ERROR
} from '../actions/types';

const initialState = {
    videos: [],
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    kidsMode: true
}

//below is the function that will be in the reducers/index.js in the combined reducers
// it will create a state with name video and then here we add
// this reducer will be called 1x upon initialization of redux ???
export default function (state = initialState, action) {  // the very first time the reducer gets called it will use this default state. Otherwise it would be undefined and lead to error.
    const { type, payload } = action;
    switch (type) {
        case GET_VIDEOS:
            return {
                ...state,
                loading: false,
                videos: payload
            };

        case VIDEO_ERROR:
            return {
                ...state,
                loading: false
            }

        // always include default that returns the state! if a reducer returns undefined -> error
        default:
            return state;
    }
}