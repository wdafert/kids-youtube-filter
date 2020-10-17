import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Landing = () => {
    return (
        <div>
            Landing Page 
             
            <Button className= "btn btn-primary" >
                <Link to="/login" id="login-button" >Login</Link>
            </Button> 
            <Button className="btn btn-primary">
                <Link to="/register" id="login-button" >Register</Link>
            </Button> 
            
        </div>
    )
}

export default Landing