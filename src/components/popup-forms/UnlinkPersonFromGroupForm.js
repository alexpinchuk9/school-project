import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {UNLINK_PERSON_FROM_GROUP_REQUEST} from "../../constants/actionTypes";

class UnlinkPersonFromGroupForm extends Component {

    state = {
        groupsToDelete: []
    }

    renderContainerGroups = () => {
        const { containerGroups } = this.props;
        return containerGroups.map(group => {
            return (
                <div className="form-row unlink-group-row" key={group.id}>
                    <div className="group-name">
                        {group.groupName}
                    </div>
                    <input
                        type="checkbox"
                        className="unlink-group-checkbox"
                        value={group.id}
                        onChange={(event) => this.handleCheckbox(event.target)}/>
                </div>
            )
        })

    }

    handleCheckbox = (checkbox) => {

        const { checked, value } = checkbox;

        if (checked) {
            const newGroupsToDelete = [...this.state.groupsToDelete, value];
            this.setState({
                groupsToDelete: newGroupsToDelete
            })
        } else {
            const newGroupsToDelete = [...this.state.groupsToDelete.splice(this.state.groupsToDelete.indexOf(value))]
            this.setState({
                groupsToDelete: newGroupsToDelete
            })
        }

    }

    render() {

        const { handleClose, handleSubmit, pristine, submitting, onSubmit } = this.props;

        const { groupsToDelete } = this.state;

        return (
            <form className="form unlink-person-from-group-form"
                  onSubmit={handleSubmit(() => onSubmit({ groupsToDelete }, UNLINK_PERSON_FROM_GROUP_REQUEST))}>
                <button className="button-close" onClick={handleClose} title="סגירה"></button>

                <div className="form-header">
                    בדוק את הקבוצות שברצונך לבטל את הקישור
                </div>

                {this.renderContainerGroups()}

                <div className="form-row">
                    <button type="submit" className="button-submit" disabled={pristine || submitting || groupsToDelete.length == 0}>הקישור</button>
                </div>

            </form>
        );
    }
}

UnlinkPersonFromGroupForm.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
};

export default UnlinkPersonFromGroupForm;
