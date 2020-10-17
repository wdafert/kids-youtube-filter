import React, { Component } from 'react';
import SearchBar from './SearchBar';
import youtube from '../../api/youtube';
import VideoDetail from './VideoDetail';
import FormInput from './FormInput';
import VideoSideList from './VideoSideList';
import './CreateVideo.css'
import axios from 'axios';

export default class CreateVideo extends Component {

    state = {
        videos: [],
        selectedVideo: null,
        videoId: null,
        channelId: null,
        title: null,
        description: null,
        thumbnail: null,
        channelTitle: null,
        selectedOption: null
    };

    componentDidMount() {
        this.onTermSubmit('kinder video');
    }

    onTermSubmit = async (term) => {
        try {
            const response = await youtube.get('/search', {
                params: {
                    q: term
                }
            }
            );
            this.setState(
                {
                    videos: response.data.items,
                    selectedVideo: response.data.items[0],
                    videoId: response.data.items[0].id.videoId,
                    channelId: response.data.items[0].snippet.channelId,
                    title: response.data.items[0].snippet.title,
                    description: response.data.items[0].snippet.description,
                    thumbnail: response.data.items[0].snippet.thumbnails.medium.url,
                    channelTitle: response.data.items[0].snippet.channelTitle,

                }
            );
        } catch (error) {
            console.log("Error", error);
        }
    }

    formSubmit = ({ Lang, Age, Viol, Ad }) => {
        console.log("xx", Lang);
        console.log("xx", Age);
        console.log("xx", Viol);
        console.log("xx", Ad);
        // TODO write to database
        const video = {
            videoId: this.state.videoId,
            channelId: this.state.channelId,
            title: this.state.title,
            description: this.state.description,
            thumbnail: this.state.thumbnail,
            channelTitle: this.state.channelTitle,
            lang: Lang,
            age: Age,
            viol: Viol,
            ad: Ad
        }
        console.log("Video", video);
        console.log("state", this.state);
        axios.post('http://localhost:5000/api/videos/add', video)
            .then(res => alert(res.data));

    }

    onVideoSelect = (video) => {
        console.log('From the App!', video);
        // setState is asynchronous!!
        this.setState({ selectedVideo: video });
        // console.log("from video:", video.snippet.title);
    }

    render() {
        return (
            <div className="ui container" >
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoSideList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
                        </div>
                    </div>
                </div>
                <FormInput onSubmit={this.formSubmit} />
            </div>
        )
    }
}
