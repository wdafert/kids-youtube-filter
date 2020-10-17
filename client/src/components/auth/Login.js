import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {


    const [formData, setFormData] = useState({
        email: '',
        password: ''
       
    });

    const { email, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();      
            console.log(formData);
            const newUser = {
                email,
                password
            }
            try {
                const config = {   //header 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const body = JSON.stringify(newUser);
                const res = await axios.post('/api/auth', body, config) //proxy with base URL added in package.json
                console.log(res.data);
                alert('User Logged In')
            } catch (err) {
                console.log(err.response.data);
                console.log(err.response.data.msg);
            }
        
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Log In</h1>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Email Adress"
                        value={email}
                        onChange={e => onChange(e)}
                        name="email"
                        required />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={e => onChange(e)}
                        name="password"
                        minLength='6' // must be same value like in server side checking
                        required />
                </div>
                <input type="submit" className="ui primary button" value='Login' />
            </form>
            No account yet? <Link to="/register" className="my-1" id="login-button" >Register</Link>

        </Fragment >
    )
}
