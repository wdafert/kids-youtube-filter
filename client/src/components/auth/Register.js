import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            console.log('Passwords do not match');
            alert('Passwords do not match');
        } else {
            console.log(formData);
            const newUser = {
                name,
                email,
                password
            }
            try {
                const config = {   //header 
                    headers: {
                        'Content-Type':'application/json'
                    }
                }
                const body = JSON.stringify(newUser);
                const res = await axios.post('/api/users', body, config) //proxy with base URL added in package.json
                console.log(res.data);
                alert('User Registered')
            } catch (err) {
                console.log(err.response.data);
            }
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <form className="form" onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name"
                        value={name}
                        onChange={e => onChange(e)}
                        name="name"
                        required />
                </div>
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
                <div className="form-group">
                    <input type="password" placeholder="Confirm Password"
                        value={password2}
                        onChange={e => onChange(e)}
                        name="password2"
                        minLength='6'  // must be same value like in server side checking
                        required />
                </div >
                <input type="submit" className="ui primary button" value='Register' />
            </form>
            Already have an account? <Link to="/login" className="my-1" id="login-button" >Sign in</Link>

        </Fragment >
    )
}
