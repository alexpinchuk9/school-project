import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { ADD_GUARDIAN_REQUEST } from "../../constants/actionTypes";

class AddGuardianForm extends Component {


    handleFormSubmission = (values) => {

        const {
            handleClose,
            onSubmit,
            guardianNumber
        } = this.props;

        onSubmit({
            guardianName: values.guardianName,
            guardianSurname: values.guardianSurname,
            guardianEmail: values.guardianEmail,
            guardianCellphone: values.guardianCellphone,
            guardianNumber}, ADD_GUARDIAN_REQUEST);
        handleClose()
    }

    onKeyPress = (event) => {
        let { which } = event;

        if (which === 13) {

        }
    }

    render() {

        const {
            handleClose,
            handleSubmit,
            pristine,
            submitting,
        } = this.props;

        return (
                <form className="form add-form add-guardian-form"
                      onSubmit={handleSubmit(values => this.handleFormSubmission(values))}
                      onKeyPress={this.onKeyPress}
                >
                    <button className="button-close" onClick={handleClose} title="close"></button>

                    <div className="form-row">
                        <label htmlFor="name" className="field-label">שם האפוטרופוס</label>
                        <Field component="input" type="text" name="guardianName" className="form-field"/>
                    </div>

                    <div className="form-row">
                        <label htmlFor="surname" className="field-label">גרדיאן שם משפחה</label>
                        <Field component="input" type="text" name="guardianSurname" className="form-field"/>
                    </div>

                    <div className="form-row">
                        <label htmlFor="email" className="field-label">אֶלֶקטרוֹנִי</label>
                        <Field component="input" type="email" name="guardianEmail" className="form-field"/>
                    </div>

                    <div className="form-row">
                        <label htmlFor="cellphone" className="field-label">טלפון נייד</label>
                        <Field component="input" type="phone" name="guardianCellphone"  className="form-field"/>
                    </div>


                    <div className="form-row">
                        <button type="submit" className="button-submit" disabled={pristine || submitting}>שלח</button>
                    </div>
                </form>

        );
    }

}

AddGuardianForm.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
};

export default AddGuardianForm;
