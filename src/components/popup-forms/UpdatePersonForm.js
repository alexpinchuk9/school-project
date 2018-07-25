import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {filePath} from "../../constants/api";
import { UPDATE_PERSON_REQUEST } from "../../constants/actionTypes";
import { Field } from 'redux-form';
import {ADD_PERSON} from "../../constants/popupTypes";
import {faPlus} from "@fortawesome/free-solid-svg-icons/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PopupComponent from '../../containers/PopupContainer';

import PeopleSearchBar from "./PeopleSearchBar";

class UpdatePersonForm extends Component {

    state = {
        guardianFieldsNumber: 2,
        popup: {
            open: false,
            type: null
        }
    }

    handlePopupOpen = (type) => {
        this.setState({
            popup: {
                open: true,
                type: type
            }
        });
    }


    handlePopupClose = () => {
        this.setState({
            popup: {
                open: false,
                type: null
            }
        });
    }

    handleUploadImage = () => {
        let image = document.getElementById('picture').files[0];
        this.props.uploadImage(image);
    }

    selectPerson = (person) => {
        console.log(person);
    };

    renderGuardianFields = () => {


        const { search,
            people,
            resetSearchResults,
            searchPeople } = this.props;
        const { guardianFieldsNumber } = this.state;

        let guardianArray = [];

        for (let i = 0; i < guardianFieldsNumber; i++) {
            guardianArray.push(i)
        }


        return guardianArray.map((guardianNumber, index) => {
            return (
                <div className="form-row add-relation-row" key={index} >

                    <span
                        title="Add a new person"
                        className="button-add-relation"
                        onClick={() => this.handlePopupOpen(ADD_PERSON)}>
                        Add
                         <FontAwesomeIcon size="xs" icon={faPlus}/>
                    </span>

                    <PeopleSearchBar
                        people={people}
                        search={search}
                        searchPeople={searchPeople}
                        resetSearchResults={resetSearchResults}
                        selectPerson={this.selectPerson}
                        searchResultId={`people-search-result-list-${guardianNumber}`}
                    />

                    <div className="relation-type">
                        <Field component="input" type="text" name="relation" placeholder="Relation (optional)" className="form-field"/>
                    </div>


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
                Add more +
            </span>;


        if(this.props.isAddGuardianForm) {
            return null;
        }

        return (
            <div className="guardian-section">
                {this.renderGuardianFields()}

                <div className="form-row">
                    {addGuardianFieldsButton}
                </div>
            </div>
        );
    }


    render() {

        const {
            handleClose,
            handleSubmit,
            pristine,
            submitting,
            image,
            onSubmit,
            person
        } = this.props;

        // const picture = image.name ? <img src={`${filePath}${image.name}`} className="form-image" alt="User Avatar" />:
        //                              <img src='/statics/img/single_user.png' className="form-image" alt="User Avatar"/>

        const { guardianFieldsNumber } = this.state;
        const {open, type} = this.state.popup;

        const addGuardianFieldsButton = guardianFieldsNumber === 4 ?
            null :
            <span className="add-guardian-fields-button"
                  onClick={this.addGuardianFields}>
                Add more +
            </span>;


        return (
            <Fragment>
                <form className="form update-form update-person-form" onSubmit={handleSubmit(values => onSubmit(values, UPDATE_PERSON_REQUEST))}>
                    <button className="button-close" onClick={handleClose} title="Close popup"></button>

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

                    {this.renderGuardianSection()}

                    <div className="form-row">
                        <button type="submit" className="button-submit" disabled={submitting || image.imageUploading }>Add person</button>
                    </div>
                </form>
                {open && <PopupComponent type={type}
                                         handleClose={this.handlePopupClose}
                                         isAddGuardianForm={true}
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
