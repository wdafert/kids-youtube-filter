import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'


const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        login(email, password);
    };

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />  // TODO
    }

    return (
        <Fragment>
            <h1 className="p-3 large text-primary">Login</h1>
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
                
                <input type="submit" className="btn btn-light btn-outline-primary" value='Login' />
                <br></br><br></br>
                No account yet? <Link to="/register" className="my-1" id="login-button" >Register</Link>
            </form>
            

        </Fragment >
    )
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool

};

// convention to call this mapState...
// takes all the data from the Redux store and show up as props inside the component
// take out the isAuthenticated state and map it to the props for this component
// every time the state changes mapSt... will be updated!

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

/* connects with the Provider and asks for access to login action
 Tell Provider that we want access to state
 login will be passed by the provider into the component as a prop
*/

export default connect(mapStateToProps, { login })(Login);

/* keep in mind... we import the login action in the top.
 but actually we DONT call this imported function directly!
 we first connect it with the Provider. Then the provider makes
it accessible as a prop! and we actually call the prop.login (deconstructed here in the parameters)
 REASON: Redux does not automatically detect when an action is called!
So we need to call the action with the DISPATCH.
This is automatically done by the connect (...{login})
It wraps the function in to store.dispatch(login(name,email))
 */