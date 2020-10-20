import { SET_ALERT, REMOVE_ALERT } from './types'
import uuid from 'uuid';


export const setAlert = (msg, alertType, timeout = 6000) => dispatch => {   //middleware
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)

}