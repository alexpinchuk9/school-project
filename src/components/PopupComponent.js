import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MESSAGE, UPDATE, PHONE, DELETE, ADD_GROUP, ADD_PERSON} from "../constants/popupTypes";
import { Field } from 'redux-form';
import {
    DELETE_GROUP_REQUEST,
    DELETE_PERSON_REQUEST,
    MESSAGE_GROUP_REQUEST,
    MESSAGE_PERSON_REQUEST,
    UPDATE_GROUP_REQUEST,
    UPDATE_PERSON_REQUEST,
    ADD_GROUP_REQUEST,
    ADD_PERSON_REQUEST
} from "../constants/actionTypes";
import { filePath } from "../constants/api";

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

            case DELETE:
                return this.renderDeleteForm();

            case ADD_GROUP:
                return this.renderAddGroupForm();

            case ADD_PERSON:
                return this.renderAddPersonForm();

            default:
                return null;
        }
    }

    renderMessageForm = () => {

        const { group, person, handleClose, handleSubmit, pristine, submitting } = this.props;
        const ACTION_TYPE = person ? MESSAGE_PERSON_REQUEST : MESSAGE_GROUP_REQUEST;
        const fieldName = person ? "personMessage" : "groupMessage";
        const messageName = person ? person.name : group.groupName;

        return (
          <form className="form message-form" onSubmit={handleSubmit(values => this.handleSubmit(values, ACTION_TYPE))}>
              <button className="button-close" onClick={handleClose}></button>

              <div className="form-row">
                  <label htmlFor="message" className="field-label">הודעה אל {messageName}</label>
                  <Field name={fieldName} component="textarea" className="form-field textarea-field"></Field>
              </div>

              <div className="form-row">
                  <button type="submit" className="button-submit" disabled={pristine || submitting}>שליחה</button>
              </div>

          </form>
        );
    }

    renderAddGroupForm = () => {

        const { group, handleClose, handleSubmit, pristine, submitting, image } = this.props;

            return (
                <form className="form add-form" onSubmit={handleSubmit(values => this.handleSubmit(values, ADD_GROUP_REQUEST))}>
                    <button className="button-close" onClick={handleClose}></button>

                    <div className="form-row">
                        <label htmlFor="name" className="field-label">Group Name</label>
                        <Field component="input" type="text" name="name" className="form-field" />
                    </div>

                    <div className="form-row">
                        <label htmlFor="parentGroupId" className="field-label">Parent Group ID (optional)</label>
                        <Field component="input" type="text" name="parentGroupId" className="form-field" />
                    </div>


                    <div className="form-row">
                        <button type="submit" className="button-submit" disabled={pristine || submitting}>Add Group</button>
                    </div>

                </form>
            );
    }

    renderAddPersonForm = () => {

        const { person, handleClose, handleSubmit, pristine, submitting, image } = this.props;

        return (
            <form className="form add-form" onSubmit={handleSubmit(values => this.handleSubmit(values, ADD_PERSON_REQUEST))}>
                <button className="button-close" onClick={handleClose}></button>

                <div className="form-row">
                    <label htmlFor="groupId" className="field-label">Group id</label>
                    <Field component="input" type="text" name="groupId" className="form-field"/>
                </div>

                <div className="form-row">
                    <label htmlFor="name" className="field-label">שם פרטי:</label>
                    <Field component="input" type="text" name="name" className="form-field"/>
                </div>

                <div className="form-row">
                    <label htmlFor="surname" className="field-label">שם משפחה:</label>
                    <Field component="input" type="text" name="surname" className="form-field"/>
                </div>

                <div className="form-row">
                    <label htmlFor="email" className="field-label">אימייל:</label>
                    <Field component="input" type="email" name="email"   className="form-field"/>
                </div>

                <div className="form-row">
                    <label htmlFor="cellphone" className="field-label">טלפון נייד:</label>
                    <Field component="input" type="phone" name="cellphone"  className="form-field"/>
                </div>

                <div className="form-row form-image-row">
                    <label htmlFor="picture">
                            <img src='/statics/img/single_user.png' className="form-image" alt="User Avatar"/>
                    </label>
                    <label htmlFor="picture" className="picture-label">בחר תמונה</label>
                    <input id="picture" type="file" name="picture" accept="image/*" className="form-field" onChange={this.handleUploadImage}/>
                </div>

                <div className="form-row">
                    <button type="submit" className="button-submit" disabled={submitting || image.imageUploading }>עדכון</button>
                </div>

            </form>
        );
    }

    renderDeleteForm = () => {
        const { group, person, handleClose } = this.props;
        const ACTION_TYPE = person ? DELETE_PERSON_REQUEST : DELETE_GROUP_REQUEST;
        const message = person ? "Are you sure you want to delete this person?" : "Are you sure you want to delete this group?";
        const id = person ? person.id : group.groupId;

        return (
          <div className="form delete-form">
              <button className="button-close" onClick={handleClose}></button>
              <div className="form-row">
                  {message}
              </div>
              <div className="form-row">
                  <button className="button-submit" onClick={() => this.handleSubmit(id, ACTION_TYPE)}>YES</button>
                  <button className="button-cancel" onClick={handleClose}>NO</button>
              </div>
          </div>
        );
    }


    handleUploadImage = () => {
        let image = document.getElementById('picture').files[0];
        this.props.uploadImage(image);
    }

    renderUpdateForm = () => {

        const { group, person, handleClose, handleSubmit, pristine, submitting, image } = this.props;

        if (group) {
            return (
                <form className="form update-form" onSubmit={handleSubmit(values => this.handleSubmit(values, UPDATE_GROUP_REQUEST))}>
                    <button className="button-close" onClick={handleClose}></button>

                    <div className="form-row">
                        <label htmlFor="groupName" className="field-label">שם הקבוצה</label>
                        <Field component="input" type="text" name="groupName" className="form-field" />
                    </div>

                    <div className="form-row">
                        <button type="submit" className="button-submit" disabled={pristine || submitting}>עדכון</button>
                    </div>

                </form>
            );
        } else if (person) {
            return (
                    <form className="form update-form" onSubmit={handleSubmit(values => this.handleSubmit(values, UPDATE_PERSON_REQUEST))}>
                        <button className="button-close" onClick={handleClose}></button>

                        <div className="form-row">
                            <label htmlFor="name" className="field-label">שם פרטי:</label>
                            <Field component="input" type="text" name="name" className="form-field"/>
                        </div>

                        <div className="form-row">
                            <label htmlFor="surname" className="field-label">שם משפחה:</label>
                            <Field component="input" type="text" name="surname" className="form-field"/>
                        </div>

                        <div className="form-row">
                            <label htmlFor="email" className="field-label">אימייל:</label>
                            <Field component="input" type="email" name="email"   className="form-field"/>
                        </div>

                        <div className="form-row">
                            <label htmlFor="cellphone" className="field-label">טלפון נייד:</label>
                            <Field component="input" type="phone" name="cellphone"  className="form-field"/>
                        </div>

                        <div className="form-row form-image-row">
                            <label htmlFor="picture">
                                {person.picSource ?
                                    <img src={`${filePath}${person.picSource}`} alt="User Avatar" className="form-image"/> :
                                    <img src='/statics/img/single_user.png' className="form-image" alt="User Avatar"/>}
                            </label>
                            <label htmlFor="picture" className="picture-label">בחר תמונה</label>
                            <input id="picture" type="file" name="picture" accept="image/*" className="form-field" onChange={this.handleUploadImage}/>
                        </div>

                        <div className="form-row">
                            <button type="submit" className="button-submit" disabled={submitting || image.imageUploading }>עדכון</button>
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
                      המספר הועתק ללוח העריכה
                  </div>
              </div>

              <div className="form-row">
                  <button onClick={handleClose} className="button-submit">סגירה</button>
              </div>

          </div>
        );
    }


    handleSubmit = (values, ACTION_TYPE) => {


        const {
            reset,
            messagePerson,
            messageGroup,
            updatePerson,
            updateGroup,
            deletePerson,
            deleteGroup,
            addGroup,
            addPerson,
            person,
            group,
            image } = this.props;

        switch(ACTION_TYPE) {
            case MESSAGE_PERSON_REQUEST:
                messagePerson(person.id, values.personMessage);
                break;

            case MESSAGE_GROUP_REQUEST:
                messageGroup(group.id, values.groupMessage);
                break;

            case UPDATE_PERSON_REQUEST:
                updatePerson(person.id, {...values, picture: image.name });
                break;

            case UPDATE_GROUP_REQUEST:
                updateGroup(group.id, values.groupName);
                break;

            case DELETE_GROUP_REQUEST:
                deleteGroup(group.id);
                break;

            case DELETE_PERSON_REQUEST:
                deletePerson(person.id);
                break;

            case ADD_PERSON_REQUEST:
                
                addPerson({...values, pic: image.name, groupId: group.id });
                break;

            case ADD_GROUP_REQUEST:
                addGroup(values);
                break;

            default:
                return;
        }

        reset();
    }

    handleServerResponse = (serverMessage) => {

        const { handleClose, resetPopupState } = this.props;

        alert(serverMessage);

        resetPopupState();
        setTimeout(handleClose, 0);
    }

    render() {
        const { serverResponse, error } = this.props.popup;

        if (serverResponse) {
            this.handleServerResponse(serverResponse)
        } else if (error) {
            this.handleServerResponse(error);
        }

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
