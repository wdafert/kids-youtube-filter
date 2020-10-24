import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ReviewerRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    profile: { profile },
    ...rest }) => {

    return (
        <Route
            {...rest}
            render={props =>
                profile.subscription !== 'Reviewer' && !loading ? (
                    < Redirect to='/login' />
                ) : (
                        <Component {...props} />
                    )
            }
        />
    );
}

ReviewerRoute.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    kidsMode: state.kidsMode,
    auth: state.auth
})

export default connect(mapStateToProps)(ReviewerRoute)
