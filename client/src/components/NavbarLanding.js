import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth'


const NavbarLanding = ({ auth: { isAuthenticated, kidsMode, loading }, profile: { profile }, logout }) => {

    const parentsLinks = (
        <ul>
            <li>
                <Link to="/edit-profile" >
                    <i className="fas fa-user"></i>{' '}
                    <span className='hide-sm'>
                        Settings
                    </span>
                </Link>
            </li>
            <li>
                <Link to="/kids" >Videos/Kids Mode</Link>
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
                <Link to="/register" >Register</Link>
            </li>
            <li>
                <Link to="/login" >Login</Link>
            </li>
        </ul>
    )


    const reviewerLinks = (
        <ul>
            <li>
                <Link to="/edit-profile" >       
                    <span className='hide-sm'>
                        Settings
                    </span>
                </Link>
            </li>
            <li>
                <Link to="/create" >Review</Link>
            </li>
            <li>
                <Link to="/list" >List</Link>
            </li>
            <li>
                <Link to="/kids" >Kids Mode</Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    );

    const kidsLinks = (
        <ul>
          
            <li>
                <Link to="/dashboard" >Parents Mode</Link>
            </li>
        </ul>
    );

    return (
        <div className="navbar">
            <h1>
                <Link to='/'>
                    KidsTube+
                </Link></h1>

            {/* Parents view: is Authenticated && is !Reviewer &&!loading */}
            {!loading && (<Fragment>
                {isAuthenticated && profile && !kidsMode && profile.subscription !== 'Reviewer' ? parentsLinks : null}
            </Fragment>)}

            {/* Reviewer view: is Authenticated && is Reviewer &&!loading */}

            {!loading && (<Fragment>
                {profile && profile.subscription === 'Reviewer' && !kidsMode ? reviewerLinks : null}
            </Fragment>)}
            {/* Kids view: is Authenticated && KidsModeOn &&!loading */}
            {!loading && (<Fragment>
                {profile && kidsMode ? kidsLinks : null}
            </Fragment>)}
            {/* Guest view: !Authenticated &&!loading */}
            {!loading && (<Fragment>
                {!isAuthenticated ? guestLinks : null}
            </Fragment>)}
        </div>
    )
}

NavbarLanding.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { logout })(NavbarLanding);