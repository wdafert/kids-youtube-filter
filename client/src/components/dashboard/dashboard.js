import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getCurrentProfile} from '../../actions/profile'
import Spinner from '../layout/spinner';

// @Access: Parent only
// loads profile from logged in user
// if none then reminds to adjust filter and add info
// if has already then show filter values
// later maybe also show favorite movies

const Dashboard = ({getCurrentProfile,auth:{user},profile:{profile,loading}}) => {
    useEffect(() => {
        getCurrentProfile()
    }, []);

    return loading && profile === null ?
        <Spinner /> : <Fragment>
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead">
            <i className="fas fa-user"></i> Welcome {user&& user.name}
            </p>
            {profile !==null ? <Fragment>has profile</Fragment> : <Fragment>You have not yet setup your filter.</Fragment>}
        </Fragment>
  
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);
