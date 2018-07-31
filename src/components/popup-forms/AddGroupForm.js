import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constants from "../../constants/actionTypes/addGroup";
import { Field } from 'redux-form';

class AddGroupForm extends Component {

    render() {

        const { handleClose, handleSubmit, pristine, submitting, onSubmit, group } = this.props;

        return (
        <form className="form add-form" onSubmit={handleSubmit(values => onSubmit(
            { name: values.newGroupName,
                parentGroupId: group.id
            }, constants.ADD_GROUP_REQUEST))}>

            <button className="button-close" onClick={handleClose} title="סגירה"></button>

            <div className="form-row">
                <label htmlFor="name" className="field-label">שם הקבוצה</label>
                <Field component="input" type="text" name="newGroupName" className="form-field" />
            </div>


            <div className="form-row">
                <button type="submit" className="button-submit" disabled={pristine || submitting}>הוספה</button>
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
