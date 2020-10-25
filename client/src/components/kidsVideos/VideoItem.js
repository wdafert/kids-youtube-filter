import React from 'react';
import './KidsVideo.css';
import { Image } from 'react-bootstrap';

const VideoItem = ({ video, onVideoSelect }) => {
    return (
        <div onClick={() => { onVideoSelect(video) }} className="video-item">
            <Image className="my-auto"
                src={video.thumbnail}
                alt={video.thumbnail}
                thumbnail
                fluid
            />
            <div className="content">
                <div className="header">{video.title}</div>
            </div>
        </div>
    );
}
// { props.video.id.videoId }
export default VideoItem;
