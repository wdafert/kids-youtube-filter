import React from 'react';
import VideoItem from './VideoItem';

// filter out the selected video from the sidelist

const VideoSideList = ({ videos, onVideoSelect }) => {   // destructuring... instead of props.videos.xxx we just make videos.xxx

    const renderedList = videos.map((video) => {
        return <VideoItem
            key={video.id.videoId}
            onVideoSelect={onVideoSelect}
            video={video} />;
    })

    return (
        <div className="">
            {renderedList}
        </div>
    );
}

export default VideoSideList;