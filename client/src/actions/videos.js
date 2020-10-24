import axios from 'axios';
import { setAlert } from './alert'

import {
    GET_VIDEOS,
    VIDEO_ERROR,
    GET_PROFILE
} from './types'


export const getVideos = (stringForVideoQuery) => async dispatch => {   // short for ... function that returns a fuction
    const totalString = '/api/videos' + stringForVideoQuery;

    try {
        const res = await axios.get(totalString);
        // const res = await axios.get('/api/videos/'); 
        //here we manually dispatch with the middleware thunk it is ok to use async!
        dispatch({
            type: GET_VIDEOS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: VIDEO_ERROR
        })
    }
}