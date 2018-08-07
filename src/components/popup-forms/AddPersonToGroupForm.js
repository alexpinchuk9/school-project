import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { ADD_PERSON_TO_GROUP_REQUEST } from "../../constants/actionTypes";
import { Field } from 'redux-form';
import GroupSearchBar from "./GroupSearchBar";

class AddPersonToGroupForm extends Component {

    onKeyPress = (event) => {
        let { which, target } = event;

        if (which === 13) {
            while (target.tagName !== 'FORM') {
                if (target.classList.contains('group-search-form')) {
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
                  onSubmit={handleSubmit(values => onSubmit({...additionalValues, relation: values.relation}, ADD_PERSON_TO_GROUP_REQUEST))}
                  onKeyPress={this.onKeyPress}
            >
                <button className="button-close" onClick={handleClose} title="סגירה"></button>

                {/*<div className="form-row">*/}
                    <GroupSearchBar
                        groups={groups}
                        search={search}
                        searchGroups={searchGroups}
                        resetSearchResults={resetSearchResults}
                        selectGroup={selectGroup}
                    />
                {/*</div>*/}

                <div className="form-row">
                    <label htmlFor="relation" className="field-label">התפקיד (רשות)</label>
                    <Field component="input" type="text" name="relation"  className="form-field" placeholder="מחנך/מנהל/..." />
                </div>

                <div className="form-row">
                    <button type="submit"
                            className="button-submit"
                            disabled={pristine || submitting || !search.lastSelectedGroup }>
                        הוספה לקבוצה
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
