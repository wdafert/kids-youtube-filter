import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';


const initialState = {
    subscription: '',
    childAge: '',
    filterAge: '',
    filterLang: '',
    filterAd: '',
    filterViol: '',
    filterMaxViewTime: '',
    date: ''
}

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {

    const [formData, setFormData] = useState(initialState);


    useEffect(() => {
        getCurrentProfile();
        setFormData({
            subscription: loading || !profile.subscription ? '' : profile.subscription,
            childAge: loading || !profile.childAge ? '' : profile.childAge,
            filterAge: loading || !profile.filterAge ? '' : profile.filterAge,
            filterLang: loading || !profile.filterLang ? '' : profile.filterLang,
            filterAd: loading || !profile.filterAd ? '' : profile.filterAd,
            filterViol: loading || !profile.filterViol ? '' : profile.filterViol,
            filterMaxViewTime: loading || !profile.filterMaxViewTime ? '' : profile.filterMaxViewTime
        });
    }, [loading]);

    // destructure
    const {
        subscription,
        childAge,
        filterAge,
        filterLang,
        filterAd,
        filterViol,
        filterMaxViewTime

    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    }

    return (
        <Fragment className="p-3">
            <h1 className="large text-primary">
                Edit Filter Settings
      </h1>
            <p className="lead">
                You only have to set up filters once. 
             
      </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <small className="form-text"
                    >Only used for development purpose</small
                    >
                    <select name="subscription" value={subscription} onChange={e => onChange(e)} >
                        <option value="0">* Subscription Status</option>
                        <option value="Reviewer">Reviewer</option>
                        <option value="FREE Plan">FREE Plan</option>
                        <option value="Silver Plan">Silver Plan</option>
                        <option value="GoldPlan">GoldPlan</option>
                    </select>
                    
                </div>
                <div className="form-group">
                    <small className="form-text"
                    >Age of your Child</small>
                    <input type="text" size="3" placeholder="Child Age" name="childAge"
                        value={childAge} onChange={e => onChange(e)} />
                    
                </div>
                <div className="form-group">
                    <small className="form-text"
                    >Each video is categorized by us with a viewers Minimum Age. You can set this different to your childs Age.</small>
                    <input type="text" size="3" name="filterAge" placeholder="Minimum Age"
                        value={filterAge} onChange={e => onChange(e)} />
                    
                </div>
                <div className="form-group">
                    <small className="form-text"
                    >Each video is manually categorized by us with the language spoken.</small
                    >
                    <select name="filterLang" value={filterLang} onChange={e => onChange(e)}>
                        <option value="0">Language</option>
                        <option value="ENG">English</option>
                        <option value="GER">German</option>
                    </select>
                   
                </div>
                <div className="form-group">
                    <small className="form-text"
                    >All videos are categorized if they include advertising, product placement, unboxing ... .</small
                    >
                    <select name="filterAd" value={filterAd} onChange={e => onChange(e)}>
                        <option value="0">Advertising Level</option>
                        <option value="1">None at all</option>
                        <option value="2">Only minor</option>
                        <option value="3">Medium</option>
                        <option value="4">Abover average</option>
                        <option value="5">Strong</option>
                    </select>
               
                </div>

                <div className="form-group">
                    <small className="form-text"
                    >Scary monsters, shooting projectiles, ... .</small
                    >
                    <select name="filterViol" value={filterViol} onChange={e => onChange(e)}>
                        <option value="0">Violence</option>
                        <option value="1">None at all</option>
                        <option value="2">Only minor</option>
                        <option value="3">Medium</option>
                        <option value="4">Abover average</option>
                        <option value="5">Strong</option>
                    </select>
                    
                </div>

                <div className="form-group">
                    <small className="form-text"
                    >How many hours of viewing is allowed in each 6 hour timeblock?</small
                    >
                    <input
                        type="text"
                        size="3"
                        placeholder="Maximum viewing time per 6 hours"
                        name="filterMaxViewTime"
                        value={filterMaxViewTime} onChange={e => onChange(e)}
                    />
                    
                </div>
                <input type="submit" className="btn btn-primary my-1" />
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
