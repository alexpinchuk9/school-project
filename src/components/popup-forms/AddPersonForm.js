import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
//  import {filePath} from "../../constants/api";
import PeopleSearchBar from "./PeopleSearchBar";
import { ADD_PERSON_REQUEST} from "../../constants/actionTypes";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ADD_PERSON } from "../../constants/popupTypes";
import PopupComponent from '../../containers/PopupContainer';

class AddPersonForm extends Component {

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
    };

    selectPerson = (guardian, guardianIndex) => {

        const { person } = this.props;

        const values = {
            peopleId: person.id,
            guardianId: guardian.id,

        }
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

        const addButton = (
            <span
                title="Add a new person"
                className="button-add-relation"
                onClick={() => this.handlePopupOpen(ADD_PERSON)}>
                        Add
                         <FontAwesomeIcon size="xs" icon={faPlus}/>
                    </span>
        );

        return guardianArray.map((guardianNumber, index) => {
            return (
                <div className="form-row add-relation-row" key={index} >



                    <PeopleSearchBar
                        people={people}
                        search={search}
                        searchPeople={searchPeople}
                        resetSearchResults={resetSearchResults}
                        selectPerson={this.selectPerson}
                        searchResultId={`people-search-result-list-${guardianNumber}`}
                    />

                    <div className="relation-type">
                        <Field
                            component="input"
                            name={`guardian${guardianNumber}`}
                            type="text" name="relation"
                            placeholder="Relation (optional)"
                            className="form-field"/>
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
            image,
            onSubmit,
        } = this.props;

        // const picture = image.name ? <img src={`${filePath}${image.name}`} className="form-image" alt="User Avatar" />:
        //                              <img src='/statics/img/single_user.png' className="form-image" alt="User Avatar"/>

        const { guardianFieldsNumber } = this.state;
        const {open, type} = this.state.popup;

        const addGuardianFieldsButton = guardianFieldsNumber === 4 ?
                                                                    null :
                                                                    <span className="add-guardian-fields-button"
                                                                            onClick={this.addGuardianFields}
                                                                        >
                                                                        Add more +
                                                                    </span>;

        return (
            <Fragment>
                <form className="form add-form add-person-form"
                      onSubmit={handleSubmit(values => onSubmit(values, ADD_PERSON_REQUEST))}
                      onKeyPress={this.onKeyPress}
                >
                    <button className="button-close" onClick={handleClose} title="Close popup"></button>

                    <div className="form-row">
                        <Field component="input" type="text" name="groupId" className="form-field" hidden/>
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
                        <Field component="input" type="email" name="email" className="form-field"/>
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
                        <button type="submit" className="button-submit" disabled={submitting || image.imageUploading || pristine }>עדכון</button>
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

AddPersonForm.propTypes = {
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

export default AddPersonForm;

