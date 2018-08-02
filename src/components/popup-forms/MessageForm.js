import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constantsGroup from "../../constants/actionTypes/messageGroup";
import * as constantsPerson from "../../constants/actionTypes/messagePerson";
import { Field } from 'redux-form';

class MessageForm extends Component {

    render() {

        const { group, person, handleClose, handleSubmit, pristine, submitting, onSubmit } = this.props;
        const ACTION_TYPE = person ? constantsPerson.MESSAGE_PERSON_REQUEST : constantsGroup.MESSAGE_GROUP_REQUEST;
        const fieldName = person ? "personMessage" : "groupMessage";
        const messageName = person ? person.name : group.groupName;

        return (
            <form className="form message-form" onSubmit={handleSubmit(values => onSubmit(values, ACTION_TYPE))}>
                <button className="button-close" onClick={handleClose} title="סגירה"></button>

                <div className="form-row">
                    <label htmlFor="message" className="field-label">הודעה אל {messageName}</label>
                    <Field name={fieldName} component="textarea" rows={10} className="form-field textarea-field"></Field>
                </div>

                <div className="form-row">
                    <button type="submit" className="button-submit" disabled={pristine || submitting}>שליחה</button>
                </div>

            </form>
        );
    }
}

MessageForm.propTypes = {
    person: PropTypes.object,
    group: PropTypes.object,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
};

export default MessageForm;
