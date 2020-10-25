import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { Container } from 'react-bootstrap';
import { kidsModeOn } from '../../actions/auth'
import { logout } from '../../actions/auth'
import { getVideos } from '../../actions/videos'

import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import './KidsVideo.css';


const initialState = {
    selectedVideo: ""
}

const KidsVideo = ({ videos: { videos, loading }, auth: { auth, isAuthenticated, kidsMode }, getVideos, profile: { profile }, kidsModeOn }) => {

    const [selectedVideo, setSelectedVideo] = useState(initialState);

    useEffect(() => {
        kidsModeOn();
        // load first video with the filter applied
        let stringForVideoQuery = null;
        if (profile) {
            console.log('Lang', profile.filterLang);
            const paramsForQuery = []
            paramsForQuery.push(profile.filterLang);
            paramsForQuery.push(profile.filterAge);
            paramsForQuery.push(profile.filterViol);
            paramsForQuery.push(profile.filterAd);
            stringForVideoQuery = '/rand/' + paramsForQuery.join('&'); // query for regular and rand for 3 random of the query
        } else {
            stringForVideoQuery = '';  // get all videos in case there is no profile
        }

        getVideos(stringForVideoQuery);
        setSelectedVideo(videos[0]);
        console.log("selectedVideo: ", selectedVideo);
    }, [loading]);

    const onVideoSelect = (video) => {
        console.log('From the App!', video);
        // setState is asynchronous!!
        setSelectedVideo(video);
    }

    if (videos.length === 0) {
        return (
            <section>
                <h2>No Videos found.</h2>
            </section>
        )
    }

    return (
        <div>
            <Container>
                <VideoDetail video={selectedVideo} />
            </Container>
            <Container>
                <VideoList className="" onVideoSelect={onVideoSelect} videos={videos} />
            </Container>
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
