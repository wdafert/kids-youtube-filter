import React from 'react';
import './VideoItem.css';


const VideoItem = ({ video}) => {
    return (
        <div className="video-item item">  
            <img className="ui image thumbnail"
                src={video.thumbnail}
                alt={video.thumbnail}
            />
            <div className="content">
                <div className="header">{video.title}</div>
            </div>
        </div>
    );
}
// { props.video.id.videoId }
export default VideoItem;
