import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ADD_PERSON_REQUEST} from "../../constants/actionTypes";
import { Field } from 'redux-form';
//  import {filePath} from "../../constants/api";
import PeopleSearchBar from "./PeopleSearchBar";

class AddPersonForm extends Component {

    state = {
        guardianFieldsNumber: 2
    }

    handleUploadImage = () => {
        let image = document.getElementById('picture').files[0];
        this.props.uploadImage(image);
    };

    selectPerson = () => {

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
                <div className="form-row" key={index} >
                    <div>
                        <label htmlFor="relation">Relation <sub>*optional</sub></label>
                        <Field component="input" type="text" name="relation"  className="form-field"/>
                    </div>
                    <PeopleSearchBar
                        people={people}
                        search={search}
                        searchPeople={searchPeople}
                        resetSearchResults={resetSearchResults}
                        selectPerson={this.selectPerson}
                    />
                    <button className="button-add-guardian">Add</button>
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
        const addGuardianFieldsButton = guardianFieldsNumber === 4 ?
                                                                    null :
                                                                    <button className="add-guardian-fields"
                                                                            onClick={this.addGuardianFields}
                                                                        >
                                                                        Add more +
                                                                    </button>;

        return (
            <form className="form add-form add-person-form" onSubmit={handleSubmit(values => onSubmit(values, ADD_PERSON_REQUEST))}>
                <button className="button-close" onClick={handleClose} title="Close popup"></button>

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

                {this.renderGuardianFields()}



                <div className="form-row">
                    <button type="submit" className="button-submit" disabled={submitting || image.imageUploading || pristine }>עדכון</button>
                </div>

            </form>
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

