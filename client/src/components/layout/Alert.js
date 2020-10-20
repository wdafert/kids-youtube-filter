import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}> 
        {alert.msg}
    </div>
));
// above ... css still missing

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts:state.alert    // to make props.alerts available here
})
export default connect(mapStateToProps)(Alert)
