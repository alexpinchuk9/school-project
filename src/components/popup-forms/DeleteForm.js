import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DELETE_GROUP_REQUEST, DELETE_PERSON_REQUEST} from "../../constants/actionTypes";

class DeleteForm extends Component {

    render() {

        const { group, person, handleClose, onSubmit } = this.props;
        const ACTION_TYPE = person ? DELETE_PERSON_REQUEST : DELETE_GROUP_REQUEST;
        const message = person ? "בטוח שברצונך למחוק?" : "בטוח שברצונך למחוק את הקבוצה?";
        const id = person ? person.id : group.groupId;

        return (
            <div className="form delete-form">
                <button className="button-close" onClick={handleClose} title="סגירה"></button>
                <div className="form-row">
                    {message}
                </div>
                <div className="form-row">
                    <button className="button-submit" onClick={() => onSubmit(id, ACTION_TYPE)}>כן</button>
                    <button className="button-cancel" onClick={handleClose}>לא</button>
                </div>
            </div>
        );
    }

}

DeleteForm.propTypes = {
    group: PropTypes.object,
    person: PropTypes.object,
    handleClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default DeleteForm;
