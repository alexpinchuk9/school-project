import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {UPDATE_GROUP_REQUEST} from "../../constants/actionTypes";
import { Field } from 'redux-form';

class UpdateGroupForm extends Component {

    render() {

        const { handleClose, handleSubmit, pristine, submitting, onSubmit } = this.props;

        return (
            <form className="form update-form"
                  onSubmit={handleSubmit(values => onSubmit(values, UPDATE_GROUP_REQUEST))}>
                <button className="button-close" onClick={handleClose}></button>

                <div className="form-row">
                    <label htmlFor="groupName" className="field-label">שם הקבוצה</label>
                    <Field component="input" type="text" name="groupName" className="form-field"/>
                </div>

                <div className="form-row">
                    <button type="submit" className="button-submit" disabled={pristine || submitting}>עדכון</button>
                </div>

            </form>
        );
    }
}

UpdateGroupForm.propTypes = {
    group: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
};

export default UpdateGroupForm;
