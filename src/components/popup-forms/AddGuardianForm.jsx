import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
//  import {filePath} from "../../constants/api";

import { ADD_GUARDIAN_REQUEST } from "../../constants/actionTypes";

class AddGuardianForm extends Component {




    onKeyPress = (event) => {
        let { which, target } = event;

        if (which === 13) {
            while (target.tagName !== 'FORM') {
                if (target.classList.contains('people-search-form')) {
                    event.preventDefault();
                }
                target = target.parentElement;
            }
        }
    }



    render() {

        const {
            handleClose,
            handleSubmit,
            pristine,
            submitting,
            onSubmit,
        } = this.props;


        return (
                <form className="form add-form add-guardian-form"
                      onSubmit={handleSubmit(values => onSubmit(values, ADD_GUARDIAN_REQUEST))}
                      onKeyPress={this.onKeyPress}
                >
                    <button className="button-close" onClick={handleClose} title="close"></button>


                    <div className="form-row">
                        <label htmlFor="name" className="field-label">Guardian Name</label>
                        <Field component="input" type="text" name="guardianName" className="form-field"/>
                    </div>

                    <div className="form-row">
                        <label htmlFor="surname" className="field-label">Guardian Last Name:</label>
                        <Field component="input" type="text" name="guardianSurname" className="form-field"/>
                    </div>

                    <div className="form-row">
                        <label htmlFor="email" className="field-label">E-mail</label>
                        <Field component="input" type="email" name="guardianEmail" className="form-field"/>
                    </div>

                    <div className="form-row">
                        <label htmlFor="cellphone" className="field-label">Guardian cellphone</label>
                        <Field component="input" type="phone" name="guardianCellphone"  className="form-field"/>
                    </div>


                    <div className="form-row">
                        <button type="submit" className="button-submit" disabled={pristine || submitting}>Submit</button>
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
