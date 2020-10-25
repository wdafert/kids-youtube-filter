import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">wolfi KIDVID </h1>
                    <p className="lead">
                        100% human reviewed Kids Videos with filters for <br />
                        - language<br />
                        - strictly <br />
                        - no violence <br />
                        - no unboxing, ...
          </p>
                    <div className="buttons">
                        <a href='#!' className="btn btn-primary">
                            <Link to="/register" id="login-button" >
                                Register
                            </Link></a>
                        <a href='#!' className="btn btn-light">
                            <Link to="/login" id="login-button" >
                                Login
                                </Link>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);