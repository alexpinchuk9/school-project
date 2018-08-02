import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    MESSAGE,
    UPDATE_PERSON,
    UPDATE_GROUP,
    PHONE,
    DELETE,
    ADD_GROUP,
    ADD_PERSON,
    ADD_PERSON_TO_GROUP,
    ADD_GUARDIAN
} from "../constants/popupTypes";

import * as constants from "../constants/actionTypes"

import AddGroupForm from "./popup-forms/AddGroupForm";
import PhoneForm from "./popup-forms/PhoneForm";
import MessageForm from "./popup-forms/MessageForm";
import UpdatePersonForm from "./popup-forms/UpdatePersonForm";
import UpdateGroupForm from "./popup-forms/UpdateGroupForm";
import DeleteForm from "./popup-forms/DeleteForm";
import AddPersonForm from "./popup-forms/AddPersonForm";
import AddPersonToGroupForm from "./popup-forms/AddPersonToGroupForm";
import AddGuardianForm from "./popup-forms/AddGuardianForm";

class PopupComponent extends Component {

    renderForm = () => {

        const {
            type,
            group,
            person,
            handleSubmit,
            handleClose,
            uploadImage,
            image,
            search,
            searchGroups,
            resetSearchResults,
            selectGroup,
            searchPeople,
            isAddGuardianForm,
            relateGuardianToPerson,
            guardianNumber,
            existingGuardians,
            popup,
            selectGuardian,
            items: {
                items: {
                    people,
                    groups
                }
            }
        } = this.props


        switch(type) {

            case MESSAGE:
                return <MessageForm
                            group={group}
                            person={person}
                            onSubmit={this.handleSubmit}
                            handleSubmit={handleSubmit}
                            handleClose={handleClose}/>;

            case UPDATE_GROUP:
                return <UpdateGroupForm
                            group={group}
                            onSubmit={this.handleSubmit}
                            handleSubmit={handleSubmit}
                            handleClose={handleClose}/>;

            case UPDATE_PERSON:
                return <UpdatePersonForm
                            selectGuardian={selectGuardian}
                            popup={popup}
                            person={person}
                            people={people}
                            search={search}
                            searchPeople={searchPeople}
                            resetSearchResults={resetSearchResults}
                            onSubmit={this.handleSubmit}
                            handleSubmit={handleSubmit}
                            handleClose={handleClose}
                            uploadImage={uploadImage}
                            relateGuardianToPerson={relateGuardianToPerson}
                            existingGuardians={existingGuardians}
                            image={image}/>;

            case PHONE:
                return <PhoneForm
                            person={person}
                            handleClose={handleClose}/>;

            case DELETE:
                return <DeleteForm
                            person={person}
                            group={group}
                            handleClose={handleClose}
                            onSubmit={this.handleSubmit}
                            handleSubmit={handleSubmit}/>;

            case ADD_GROUP:
                return <AddGroupForm
                            group={group}
                            onSubmit={this.handleSubmit}
                            handleSubmit={handleSubmit}
                            handleClose={handleClose}/>;

            case ADD_PERSON:
                return <AddPersonForm
                            selectGuardian={selectGuardian}
                            popup={popup}
                            person={person}
                            people={people}
                            search={search}
                            searchPeople={searchPeople}
                            resetSearchResults={resetSearchResults}
                            onSubmit={this.handleSubmit}
                            handleSubmit={handleSubmit}
                            handleClose={handleClose}
                            uploadImage={uploadImage}
                            isAddGuardianForm={isAddGuardianForm}
                            relateGuardianToPerson={relateGuardianToPerson}
                            existingGuardians={existingGuardians}
                            image={image}/>;

            case ADD_PERSON_TO_GROUP:
                return <AddPersonToGroupForm
                            onSubmit={this.handleSubmit}
                            handleSubmit={handleSubmit}
                            handleClose={handleClose}
                            groups={groups}
                            search={search}
                            searchGroups={searchGroups}
                            resetSearchResults={resetSearchResults}
                            person={person}
                            selectGroup={selectGroup}/>;

            case ADD_GUARDIAN:
                return <AddGuardianForm
                            guardianNumber={guardianNumber}
                            handleClose={handleClose}
                            handleSubmit={handleSubmit}
                            onSubmit={this.handleSubmit}/>

            default:
                return null;
        }
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
            addPersonToGroup,
            addGuardian,
            person,
            group,
            image } = this.props;

        switch(ACTION_TYPE) {
            case constants.MESSAGE_PERSON_REQUEST:
                messagePerson(person.id, values.personMessage);
                break;

            case constants.MESSAGE_GROUP_REQUEST:
                messageGroup(group.id, values.groupMessage);
                break;

            case constants.UPDATE_PERSON_REQUEST:
                updatePerson(person.id, {...values, picture: image.name });
                break;

            case constants.UPDATE_GROUP_REQUEST:
                updateGroup(group.id, values.groupName);
                break;

            case constants.DELETE_GROUP_REQUEST:
                deleteGroup(group.id);
                break;

            case constants.DELETE_PERSON_REQUEST:
                deletePerson(person.id);
                break;

            case constants.ADD_PERSON_REQUEST:
                addPerson({...values, pic: image.name, groupId: group.id });
                break;

            case constants.ADD_GROUP_REQUEST:
                addGroup(values);
                break;

            case constants.ADD_PERSON_TO_GROUP_REQUEST:
                addPersonToGroup(values);
                break;

            case constants.ADD_GUARDIAN_REQUEST:
                addGuardian(values);
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
        const { className, refreshItems, group, person } = this.props;


        if (serverResponse) {
            this.handleServerResponse(serverResponse);
            if (person) {
                refreshItems(person);
            } else {
                refreshItems(group);
            }
        } else if (error) {
            this.handleServerResponse(error);
        }

        return (
            <div className={`popup ${className}`}>
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
