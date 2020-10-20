// function that takes in a token. if there add to header for each next request
// if not delete 

import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        console.log('has token inside setAuthToken');
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken;