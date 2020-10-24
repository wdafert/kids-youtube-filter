import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

import { kidsModeOn } from '../../actions/auth'
import { logout } from '../../actions/auth'
import { getVideos } from '../../actions/videos'
import videos from '../../reducers/videos';
import VideoList from './VideoList';


const initialState = {
    thumb: '',
}

const KidsVideo = ({ videos: { videos, thumbnail, loading }, auth: { auth, isAuthenticated, kidsMode }, logout, getVideos, profile: { profile }, kidsModeOn, getCurrentProfile }) => {

    const [videoData, setVideoData] = useState(initialState);

    let stringForVideoQuery = '';

    useEffect(() => {
        kidsModeOn();
        // getCurrentProfile();

        console.log(kidsMode);
        // load first video with the filter applied
        if (profile) {
            console.log('Lang', profile.filterLang);
            const paramsForQuery = []
            paramsForQuery.push(profile.filterLang);
            paramsForQuery.push(profile.filterAge);
            paramsForQuery.push(profile.filterViol);
            paramsForQuery.push(profile.filterAd);
            // paramsForQuery.push("ENG");
            // paramsForQuery.push("0");
            // paramsForQuery.push("0");
            // paramsForQuery.push("0");
            stringForVideoQuery = '/query/' + paramsForQuery.join('&');

        }

        getVideos(stringForVideoQuery);

        // var urlStart = "http://example.com"
        // var params = []
        // params.push('a=1')
        // params.push('b=2')
        // params.push('c=3', 'd=4')
        // url = urlStart + '?' + params.join('&')
        // console.log(url)  // http://example.com?a=1&b=2&c=3&d=4

        console.log('Loading', loading);
        console.log('Thumbnail', thumbnail);
        console.log(videos);
        // setVideoData({
        //     thumb: !loading ? videos.1.thumbnail : 'X'
        // });

        // either filter here the state or filter in the display directly on the store prop


    }, [loading]);

    // destructure
    const {
        thumb
    } = videoData;

    // const onChange = e => setVideoData({ ...videoData, [e.target.name]: e.target.value });

    // const onSubmit = e => {
    //     e.preventDefault();
    //     // change video
    //     console.log('Change video');
    // }

    // onVideoSelect = (video) => {
    //     console.log('From the App!', video);
    //     // setState is asynchronous!!
    //     this.setState({ selectedVideo: video });
    //     // console.log("from video:", video.snippet.title);
    // }
    if (videos.length == 0) {
        console.log('length', videos.title);
        return (
            <section>
                <h2>No Videos found.</h2>
            </section>
        )
    } else {
        console.log('videos', videos);
        console.log('length', videos.length);
    }

    // const videoSrc = `https://www.youtube.com/embed/${videos.videoId}`;
    return (
        <div className="video-details">
            {/*}
                    <div className="ui embed">
                        <iframe title="video-player" src={videoSrc}></iframe>
                    </div>

                    <VideoList videos={videos} />
                 */}
            <div className="ui segment">
                <h4 className="ui header">
                    Videos are here!
                      {videos.map(video => (
                    <div> Video Title: {video.title}</div>
                ))}

                </h4>
                <p></p>
                {thumbnail}
            </div>
        </div>
    )

}

KidsVideo.propTypes = {
    kidsModeOn: PropTypes.bool.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    videos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    videos: state.videos
})

export default connect(mapStateToProps, { logout, getVideos, getCurrentProfile, kidsModeOn })(KidsVideo);
