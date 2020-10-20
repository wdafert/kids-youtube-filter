import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth'

const NavbarLanding = ({ auth: { isAuthenticated, loading }, logout }) => {

    const authLinks = (
        <ul>
            <li>
                <Link to="/dashboard" >
                    <i className="fas fa-user"></i>{' '}
                    <span className='hide-sm'>
                        Filter Settings
                    </span>     
                </Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <a href='#!'>Link1</a>
            </li>
            <li>
                <Link to="/register" >Register</Link>
            </li>
            <li>
                <Link to="/login" >Login</Link>
            </li>
        </ul>
    )

    return (
        <div className="navbar bg-dark">
            <h1>
                <Link to='/'>
                    Youtube Kids Filter
                </Link></h1>
            {!loading && (<Fragment>
                {isAuthenticated ? authLinks : guestLinks}
            </Fragment>)}
        </div>


    )

}

NavbarLanding.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, { logout })(NavbarLanding);