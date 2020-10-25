import React from 'react';
import './VideoItem.css';
import { Image } from 'react-bootstrap';

const VideoItem = ({ video, onVideoSelect }) => {
    return (
        <div onClick={() => { onVideoSelect(video) }} className="video-item item">
            <Image src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.thumbnails.title}
                fluid />
            <div className="content">
                <div className="header">{video.snippet.title}</div>
            </div>
        </div>
    );
}
// { props.video.id.videoId }
export default VideoItem;
