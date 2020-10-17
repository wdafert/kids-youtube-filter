import React from 'react';
import './VideoItem.css';


const VideoItem = ({ video, onVideoSelect }) => {
    return (
        <div onClick={() => { onVideoSelect(video) }} className="video-item item">
            <img className="ui image thumbnail"
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.thumbnails.title}
            />
            <div className="content">
                <div className="header">{video.snippet.title}</div>
            </div>
        </div>
    );
}
// { props.video.id.videoId }
export default VideoItem;
