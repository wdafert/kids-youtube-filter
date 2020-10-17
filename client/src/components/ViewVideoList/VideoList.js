import React, { Component } from 'react'
import axios from 'axios';


const VideoDisplay = props => (
    <tr>
        <td>{props.video.title}</td>
        <td>{props.video.ad}</td>
        <td>{props.video.age}</td>
        <td>{props.video.lang}</td>
        <td>{props.video.viol}</td>
    </tr>
)

export default class VideoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/videos')
            .then(response => {
                this.setState({ videos: response.data })
            })
            .then(console.log("Videos from DB", this.videos))
            .catch((error) => {
                console.log(error);
            })
    }


    videoListDisplay = () => {
        return this.state.videos.map((video) => {
            return <VideoDisplay video={video} />
        })
    }


    render() {
        return (
            <div>
                <h3>"Videos"</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                            <th>Age</th>
                            <th>Language</th>
                            <th>Ad</th>
                            <th>Violence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.videoListDisplay()}
                    </tbody>
                </table>
            </div>
        )
    }
}
