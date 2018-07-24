import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { ADD_PERSON_TO_GROUP_REQUEST } from "../../constants/actionTypes";
import { Field } from 'redux-form';
import GroupSearchBar from "./GroupSearchBar";

class AddPersonToGroupForm extends Component {

    render() {

        const {
            handleClose,
            handleSubmit,
            pristine,
            submitting,
            onSubmit,
            groups,
            search,
            searchGroups,
            resetSearchResults,
            person,
            selectGroup
        } = this.props;


        let additionalValues = {
            groupId: search.lastSelectedGroup ? search.lastSelectedGroup.id : "",
            personId: person.id
        };

        return (
            <form className="form add-form"
                  onSubmit={handleSubmit(values => onSubmit({...additionalValues, relation: values.relation}, ADD_PERSON_TO_GROUP_REQUEST))}>
                <button className="button-close" onClick={handleClose} title="Close popup"></button>



                <div className="form-row">
                    <GroupSearchBar
                        groups={groups}
                        search={search}
                        searchGroups={searchGroups}
                        resetSearchResults={resetSearchResults}
                        selectGroup={selectGroup}
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="relation">Relation <sub>*optional</sub></label>
                    <Field component="input" type="text" name="relation"  className="form-field"/>
                </div>

                <div className="form-row">
                    <button type="submit"
                            className="button-submit"
                            disabled={pristine || submitting || !search.lastSelectedGroup }>
                        Add Person to Group
                    </button>
                </div>

            </form>
        );
    }

}

AddPersonToGroupForm.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
};

export default AddPersonToGroupForm;
