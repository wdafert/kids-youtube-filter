import React from 'react';
import VideoItem from './VideoItem';
import './KidsVideo.css';

const VideoList = ({ videos, onVideoSelect }) => {   // destructuring... instead of props.videos.xxx we just make videos.xxx

    const renderedList = videos.slice(1, 4).map((video) => {
        return <VideoItem
            key={video.videoId}
            onVideoSelect={onVideoSelect}
            video={video} />;
    })
    console.log(videos);

    return (
        <div className="my-auto">
            {renderedList}
        </div>
    );
}

export default VideoList;