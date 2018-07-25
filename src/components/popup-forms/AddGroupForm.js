import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ADD_GROUP_REQUEST} from "../../constants/actionTypes";
import { Field } from 'redux-form';

class AddGroupForm extends Component {

    render() {

        const { handleClose, handleSubmit, pristine, submitting, onSubmit, group } = this.props;

        return (
        <form className="form add-form" onSubmit={handleSubmit(values => onSubmit(
            { name: values.newGroupName,
                parentGroupId: group.id
            }, ADD_GROUP_REQUEST))}>

            <button className="button-close" onClick={handleClose} title="Close popup"></button>

            <div className="form-row">
                <label htmlFor="name" className="field-label">Group Name</label>
                <Field component="input" type="text" name="newGroupName" className="form-field" />
            </div>


            <div className="form-row">
                <button type="submit" className="button-submit" disabled={pristine || submitting}>Add Group</button>
            </div>

        </form>
    );
}

}

AddGroupForm.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
};

export default AddGroupForm;
