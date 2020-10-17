import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class NavbarLanding extends Component {
    render() {
        return (

            <div className="ui menu">
                <Link to="/register" >
                    <div className="item">
                        <div className="ui primary button">
                            Register
                        </div>
                    </div>
                </Link>
              
                <Link to="/login" >
                    <div className="item">
                        <div className="ui primary button">
                            Login
                        </div>
                    </div>
                </Link>
            </div >

        )
    }
}
