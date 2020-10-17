import React from 'react';
import VideoItem from './VideoItem';


const VideoSideList = ({ videos, onVideoSelect }) => {   // destructuring... instead of props.videos.xxx we just make videos.xxx

    const renderedList = videos.map((video) => {
        return <VideoItem
            key={video.id.videoId}
            onVideoSelect={onVideoSelect}
            video={video} />;

    })

    return (
        <div className="video-list ui relaxed divided list">
            {renderedList}
        </div>
    );
}

export default VideoSideList;