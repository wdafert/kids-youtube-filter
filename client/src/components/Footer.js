import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import footerImage from '../img/fence.jpg'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <img src={footerImage} alt="Logo" width="100%"/>
            </div>
            
        )
    }
}
