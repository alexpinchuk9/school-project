import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { MESSAGE, UPDATE, PHONE } from "../constants/popupTypes";
import { Field } from 'redux-form';
import {
    MESSAGE_GROUP_REQUEST,
    MESSAGE_PERSON_REQUEST,
    UPDATE_GROUP_REQUEST,
    UPDATE_PERSON_REQUEST
} from "../constants/actionTypes";

class PopupComponent extends Component {

    renderForm = () => {
        const { type } = this.props;
        switch(type) {
            case MESSAGE:
                return this.renderMessageForm();
            case UPDATE:
                return this.renderUpdateForm();
            case PHONE:
                return this.renderPhoneForm();
            default:
                return null;
        }
    }

    renderMessageForm = () => {
        const { group, person, handleClose, handleSubmit, pristine, submitting } = this.props;
        const ACTION_TYPE = person ? MESSAGE_PERSON_REQUEST : MESSAGE_GROUP_REQUEST;
        const fieldName = person ? "personMessage" : "groupMessage";
        return (
          <form className="form message-form" onSubmit={handleSubmit(values => this.handleSubmit(values, ACTION_TYPE))}>
              <button className="button-close" onClick={handleClose}></button>
              <div className="form-row">
                  <label htmlFor="message" className="field-label">Message for {person.name || group.groupName}</label>
                  <Field name={fieldName} component="textarea" className="form-field textarea-field"></Field>
              </div>
              <div className="form-row">
                  <button type="submit" className="button-submit" disabled={pristine || submitting}>Send</button>
              </div>

          </form>
        );
    }


    renderUpdateForm = () => {
        const { group, person, handleClose, handleSubmit, pristine, submitting } = this.props;
        if(group) {
            return (
                <form className="form update-form" onSubmit={handleSubmit(values => this.handleSubmit(values, UPDATE_GROUP_REQUEST))}>
                    <button className="button-close" onClick={handleClose}></button>
                    <div className="form-row">
                        <label htmlFor="groupName" className="field-label">Group name:</label>
                        <Field component="input" type="text" name="groupName" className="form-field" />
                    </div>
                    <div className="form-row">
                        <button type="submit" className="button-submit" disabled={pristine || submitting}>Update</button>
                    </div>
                </form>
            );
        } else if(person) {
            return (
                    <form className="form update-form" onSubmit={handleSubmit(values => this.handleSubmit(values, UPDATE_PERSON_REQUEST))}>
                        <button className="button-close" onClick={handleClose}></button>
                        <div className="form-row">
                            <label htmlFor="name" className="field-label">Name:</label>
                            <Field component="input" type="text" name="name" className="form-field"/>
                        </div>
                        <div className="form-row">
                            <label htmlFor="surname" className="field-label">Surname:</label>
                            <Field component="input" type="text" name="surname" className="form-field"/>
                        </div>
                        <div className="form-row">
                            <label htmlFor="email" className="field-label">Email:</label>
                            <Field component="input" type="email" name="email"   className="form-field"/>
                        </div>
                        <div className="form-row">
                            <label htmlFor="cellphone" className="field-label">Cellphone:</label>
                            <Field component="input" type="phone" name="cellphone"  className="form-field"/>
                        </div>
                        <div className="form-row form-image-row">
                            <label htmlFor="picture">
                                {person.picSource ?
                                    <img src={person.picSource} alt="User Avatar"/> :
                                    <img src={require('../statics/img/single_user.png')} className="form-image" alt="User Avatar"/>}
                            </label>
                            <label htmlFor="picture" className="picture-label">Upload pic</label>
                            {/*// TODO: find a solution for redux-form field with file type*/}
                            <input id="picture" type="file" name="picture" accept="image/*" className="form-field"/>
                        </div>
                        <div className="form-row">
                            <button type="submit" className="button-submit" disabled={pristine || submitting}>Update</button>
                        </div>
                    </form>
                );
        }
    }

    copyToClipboard = (str) => {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    renderPhoneForm = () => {
        const { person, handleClose } = this.props;
        this.copyToClipboard(person.cellphone);
        return (
          <div className="form phone-form">
              <div className="form-row">
                  <div className="form-text">
                      {person.cellphone}
                  </div>
              </div>
              <div className="form-row">
                  <div className="form-text">
                      Copied to clipboard
                  </div>
              </div>
              <div className="form-row">
                  <button onClick={handleClose} className="button-submit">Close</button>
              </div>
          </div>
        );
    }


    handleSubmit = (values, ACTION_TYPE) => {
        const { reset, messagePerson, messageGroup, updatePerson, updateGroup, person, group } = this.props;
        switch(ACTION_TYPE) {
            case MESSAGE_PERSON_REQUEST:
                messagePerson(person.id, values.personMessage);
                break;
            case MESSAGE_GROUP_REQUEST:
                messageGroup(group.id, values.groupMessage);
                break;
            case UPDATE_PERSON_REQUEST:
                // TODO: find a way to make the fileField work with redux form
                // TODO: find out how to upload the picture onto the server (once it's working)
                const fileField = document.getElementById("picture");
                const picture = fileField.files[0];
                const picSource = fileField.value;
                let updatedValues = {...values, picture, picSource};
                updatePerson(person.id, updatedValues);
                break;
            case UPDATE_GROUP_REQUEST:
                updateGroup(group.id, values.groupName);
                break;
            default:
                return;
        }
        reset();
    }
    render() {
        return (
            <div className={`popup`}>
                {this.renderForm()}
            </div>
        );
    }
}

PopupComponent.propTypes = {
    person: PropTypes.object,
    group: PropTypes.object,
    type: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default PopupComponent;
