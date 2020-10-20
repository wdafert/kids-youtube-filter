import React, { Fragment, useState } from 'react'
import { Link ,Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'; //redux action
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'


const Register = ({ setAlert, register,isAuthenticated }) => {    // props come from the redux store

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
            setAlert('Passwords do not match', 'danger');  // pass this as a message to our actions(alert.js), generate id and dispatch 
        } else {
            console.log('SUCCESS');           
            register({ name, email, password })
        }
    }
    if (isAuthenticated) {
        return <Redirect to = '/dashboard' />  //TODO change later
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <form className="form" onSubmit={e => onSubmit(e)}>
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

Register.prototype = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
  //Redux connect takes in state that we want to map (here null) second is the object with actions
// the setAlert in connect allows us to access props in the function Register(props) on top!
