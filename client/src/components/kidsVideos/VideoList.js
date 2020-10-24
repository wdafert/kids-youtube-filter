import React from 'react';
import VideoItem from './VideoItem';


const VideoList = ({ videos }) => {   // destructuring... instead of props.videos.xxx we just make videos.xxx

    // const renderedList = videos.map((video) => {
    //     return <VideoItem
    //         key={video.videoId}
    //         video={video} />;
    // })
    console.log(videos);

    const renderedList = videos.map((video) => {
        return null;
    });

    return (
        <div className="video-list ui relaxed divided list">
            {renderedList}
        </div>
    );
}

export default VideoList;