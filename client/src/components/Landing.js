import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <section className="landing">
            <div className="p-3 dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Protect your children from violence, advertising and other unwanted content. </h1>
                    <p className="lead">
                        100% human reviewed Kids Videos with filters for <br />
                        - language<br />
                        - no violence <br />
                        - no unboxing, or other unwanted ads ...
          </p>
                    <div className="buttons">
                        <a href='#!' className="btn m-2 btn-light">
                            <Link to="/register" id="login-button" >
                                Register
                            </Link></a>
                        <br></br>
                        <a href='#!' className="btn m-2 btn-light">
                            <Link to="/login" id="login-button" >
                                Login
                                </Link>
                        </a>
                    </div>
                </div>
                <div className="p-3">
                    This is a test project created 2020 by 
                    <a href='https://wolfgangdafert.com/'> Wolfgang Dafert</a> ---                    
                    <a href='https://github.com/wdafert/kids-youtube-filter'> Code @ Github</a>
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