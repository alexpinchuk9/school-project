import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {filePath} from "../../constants/api";
import { UPDATE_PERSON_REQUEST } from "../../constants/actionTypes";
import { Field } from 'redux-form';

class UpdatePersonForm extends Component {

    handleUploadImage = () => {
        let image = document.getElementById('picture').files[0];
        this.props.uploadImage(image);
    }

    render() {

        const { person, handleClose, handleSubmit, submitting, image, onSubmit } = this.props;

            return (
                <form className="form update-form" onSubmit={handleSubmit(values => onSubmit(values, UPDATE_PERSON_REQUEST))}>
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

                    <div className="form-row">

                    </div>

                    <div className="form-row">
                        <button type="submit" className="button-submit" disabled={submitting || image.imageUploading }>Add person</button>
                    </div>

                </form>
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
