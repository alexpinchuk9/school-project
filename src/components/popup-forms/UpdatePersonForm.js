import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {filePath} from "../../constants/api";
import { UPDATE_PERSON_REQUEST } from "../../constants/actionTypes";
import { Field } from 'redux-form';
import {ADD_GUARDIAN} from "../../constants/popupTypes";
import {faPlus} from "@fortawesome/free-solid-svg-icons/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PopupComponent from '../../containers/PopupContainer';

import PeopleSearchBar from "./PeopleSearchBar";

class UpdatePersonForm extends Component {

    state = {
        guardianFieldsNumber: 2,
        popup: {
            open: false,
            type: null,
            guardianNumber: null
        }
    }

    handlePopupOpen = (type, guardianNumber) => {
        this.setState({
            popup: {
                open: true,
                type: type,
                guardianNumber: guardianNumber
            }
        });
    }


    handlePopupClose = () => {
        this.setState({
            popup: {
                open: false,
                type: null,
                guardianNumber: null
            }
        });
    }

    handleUploadImage = () => {
        let image = document.getElementById('picture').files[0];
        this.props.uploadImage(image);
    }

    selectPerson = (guardian, guardianNumber) => {


        const { id, name, surname } = guardian;
        const values = {
            guardianId: id,
            guardianName: name,
            guardianSurname: surname,
            guardianNumber
        }

        this.props.selectGuardian(values)


    };

    renderGuardianFields = () => {


        const {
            search,
            people,
            resetSearchResults,
            searchPeople,
            popup,
            existingGuardians
        }
         = this.props;

        const { guardianFieldsNumber } = this.state;

        let guardianArray = [];

        for (let i = 0; i < guardianFieldsNumber; i++) {
            guardianArray.push(i)
        }




        return guardianArray.map((guardianNumber, index) => {
            return (
                <div className="form-row add-relation-row" key={index} >

                    <div className="relation-type">
                        <input
                            defaultValue={existingGuardians[guardianNumber] ? existingGuardians[guardianNumber].relation : ""}
                            type="text"
                            name={`relation${guardianNumber}`}
                            ref={input => this[`relation${guardianNumber}`] = input}
                            placeholder="אבא/אמא/..."
                            className="form-field"/>
                    </div>


                    <PeopleSearchBar
                        existingGuardian={existingGuardians[guardianNumber]}
                        newGuardian={popup.guardians[guardianNumber]}
                        people={people}
                        search={search}
                        searchPeople={searchPeople}
                        resetSearchResults={resetSearchResults}
                        selectPerson={this.selectPerson}
                        guardianNumber={guardianNumber}
                        searchResultId={`people-search-result-list-${guardianNumber}`}
                    />

                    <span
                        title="Add a new person"
                        className="button-add-relation"
                        onClick={() => this.handlePopupOpen(ADD_GUARDIAN, guardianNumber)}>
                          Add
                          <FontAwesomeIcon size="xs" icon={faPlus}/>
                      </span>

                </div>
            );
        })

    }

    addGuardianFields = () => {

        this.setState((state,props) => (
            {
                guardianFieldsNumber: state.guardianFieldsNumber + 1
            })
        )
    };

    renderGuardianSection = () => {

        const { guardianFieldsNumber } = this.state;

        const addGuardianFieldsButton = guardianFieldsNumber === 4 ?
            null :
            <span className="add-guardian-fields-button"
                  onClick={this.addGuardianFields}>
                 + הוסף הורה
            </span>;


        return (
            <div className="guardian-section">
                {this.renderGuardianFields()}

                <div className="form-row">
                    {addGuardianFieldsButton}
                </div>
            </div>
        );
    }

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

    handleFormSubmission = (values) => {
        const {
            handleClose,
            handleSubmit,
            pristine,
            submitting,
            image,
            onSubmit,
            person,
            existingGuardians
        } = this.props;

        const { guardians } = this.props.popup;

        const guardianId1 = guardians [0] && guardians[0].id ? `${guardians[0].id}` : existingGuardians[0] ? existingGuardians[0].id : "";
        const guardianId2 = guardians [1] && guardians[1].id ? `${guardians[1].id}` : existingGuardians[1] ? existingGuardians[1].id : "";
        const guardianId3 = guardians [2] && guardians[2].id ? `${guardians[2].id}` : existingGuardians[2] ? existingGuardians[2].id : "";
        const guardianId4 = guardians [3] && guardians[3].id ? `${guardians[3].id}` : existingGuardians[3] ? existingGuardians[3].id : "";

        const newValues = {
            guardianId1,
            relation1: this.relation0 ? this.relation0.value : "" || "",
            guardianId2,
            relation2: this.relation1 ? this.relation1.value : "" || "",
            guardianId3,
            relation3: this.relation2 ? this.relation2.value : "" || "",
            guardianId4,
            relation4: this.relation3 ? this.relation3.value : "" || "",
        };

        onSubmit({...values, ...newValues}, UPDATE_PERSON_REQUEST)
    }


    render() {

        const {
            handleClose,
            handleSubmit,
            submitting,
            image,
            person
        } = this.props;

        const { popup } = this.state;
        const { open, type, guardianNumber } = popup;


        return (
            <Fragment>
                <form className="form update-form update-person-form"
                      onSubmit={handleSubmit(values => this.handleFormSubmission(values))}
                      onKeyPress={this.onKeyPress}
                >
                    <button className="button-close" onClick={handleClose} title="סגירה"></button>

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

                    { person.isDependant === "0" ? null : this.renderGuardianSection()}

                    <div className="form-row">
                        <button type="submit" className="button-submit" disabled={submitting || image.imageUploading }>עדכן אדם</button>
                    </div>
                </form>
                {open && <PopupComponent type={type}
                                         handleClose={this.handlePopupClose}
                                         guardianNumber={guardianNumber}
                                         className="guardian-popup"
                />}
            </Fragment>

            );
    }
}

UpdatePersonForm.propTypes = {
    person: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    image: PropTypes.shape({
        loading: PropTypes.bool,
        name: PropTypes.string
    })
};

export default UpdatePersonForm;
