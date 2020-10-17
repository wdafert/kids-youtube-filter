import React from 'react';


const VideoDetail = ({ video }) => {
    if (!video) {
        return <div>loading...</div>;
    } else {
        const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
        return (
            <div className="video-details">
                <div className="ui embed">
                    <iframe title="video-player" src={videoSrc}></iframe>
                </div>
                <div className="ui segment">
                    <h4 className="ui header">
                        {video.snippet.title}
                    </h4>
                    <p></p>
                    {video.snippet.description}
                </div>
            </div>
        )
    }
};


export default VideoDetail;