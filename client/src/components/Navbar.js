import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
    render() {
        return (
            <nav className="ui pointing menu">
                <li className="item active">
                    <Link to="/list" className="nav-link">Videos</Link>
                </li>
                <li className="item">
                    <Link to="/create" >Create Video</Link>
                </li>
                <li className="item">
                    <Link to="/user" >Create User</Link>
                </li>
            </nav>
        )
    }
}
