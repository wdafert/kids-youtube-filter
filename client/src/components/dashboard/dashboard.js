import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/spinner';
import { kidsModeOff } from '../../actions/auth'

// @Access: Parent only
// loads profile from logged in user
// if none then reminds to adjust filter and add info
// if has already then show filter values
// later maybe also show favorite movies

const Dashboard = ({ getCurrentProfile, auth: { user }, kidsModeOff, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
        kidsModeOff();
    }, []); // only update the first time

    return loading && profile === null ?
        <Spinner /> : <Fragment>
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome back {user && user.name}
            </p>
            {profile !== null ?
                <Fragment>
                    You already have filters setup
                    <Fragment>
                        <Link to='/edit-profile' className="btn btn-primary my-1">
                            Edit Filters
                   </Link>
                    </Fragment>
                </Fragment> :
                <Fragment>
                    You have not yet setup your filter.
                    <Link to='/create-profile' className="btn btn-primary my-1">
                        Set up Filters
                    </Link>
                </Fragment>}
        </Fragment>

}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    kidsModeOff: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, kidsModeOff })(Dashboard);
