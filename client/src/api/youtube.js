import axios from "axios";

const KEY = 'AIzaSyChL3271ty8WlSFL_ni-194APdZjHaNIf4';

export default axios.create({
    baseURL: 'Xhttps://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
});