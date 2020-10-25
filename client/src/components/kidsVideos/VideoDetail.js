import React from 'react';
import './KidsVideo.css';

const VideoDetail = ({ video }) => {
    if (!video) {
        return <div>loading...</div>;
    } else {
        const videoSrc = `https://www.youtube.com/embed/${video.videoId}?modestbranding=1&autohide=1&showinfo=0&controls=0`; //add for autoplay .. ?autoplay=1
        return (
            <div className="video-details ">
                <div
                    className="video"
                    style={{
                        position: "relative",
                        paddingBottom: "56.25%" /* 16:9 */,
                        paddingTop: 25,
                        height: 0
                    }}
                >
                    <iframe
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%"
                        }}
                        src={videoSrc}
                        frameBorder="0"
                        title="Kids Videos"
                    />
                    <h4 className="ui header">
                        {video.title}

                    </h4>
                </div>
            </div>
        )
    }
};

export default VideoDetail;