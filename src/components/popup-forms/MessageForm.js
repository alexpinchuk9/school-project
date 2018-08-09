import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MESSAGE_GROUP_REQUEST, MESSAGE_PERSON_REQUEST} from "../../constants/actionTypes";
import { Field } from 'redux-form';


// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

const editorConfig =  {
    placeholderText: 'Edit your message here!',
    charCounterCount: true
}
class MessageForm extends Component {

    state = {
        message: ''
    }



    handleModelChange = (model) => {
        this.setState({
            message: model
        });
    }

    render() {
        console.log(this.state);
        const { group, person, handleClose, handleSubmit, pristine, submitting, onSubmit } = this.props;
        const ACTION_TYPE = person ? MESSAGE_PERSON_REQUEST : MESSAGE_GROUP_REQUEST;
        const fieldName = person ? "personMessage" : "groupMessage";
        const messageName = person ? person.name : group.groupName;
        const { message } = this.state;

        return (
            <form className="form message-form" onSubmit={handleSubmit(values => onSubmit({ message }, ACTION_TYPE))}>
                <button className="button-close" onClick={handleClose} title="סגירה"></button>
                <div className="form-row">
                    <label htmlFor="message" className="field-label label-message">הודעה אל {messageName}</label>
                    <FroalaEditor
                        tag='textarea'
                        model={message}
                        onModelChange={this.handleModelChange}
                        config={editorConfig}/>
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
