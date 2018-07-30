import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PopupComponent from "../components/PopupComponent";
import {
    messagePerson,
    messageGroup,
    updatePerson,
    updateGroup,
    uploadImage,
    resetPopupState,
    deleteGroup,
    deletePerson,
    addGroup,
    addPerson,
    addPersonToGroup,
    searchGroups,
    resetSearchResults,
    selectGroup,
    searchPeople,
    refreshItems,
    relateGuardianToPerson,
    addGuardian
} from "../actions";

const mapStateToProps = (state) => {
    return {
        image: state.image,
        popup: state.popup,
        items: state.items,
        search: state.search
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        messagePerson: (id, message) => {
            dispatch(messagePerson(id, message))
        },
        messageGroup: (id, message) => {
            dispatch(messageGroup(id, message))
        },
        updatePerson: (id, values) => {
            dispatch(updatePerson(id, values))
        },
        updateGroup: (id, groupName) => {
            dispatch(updateGroup(id, groupName))
        },
        uploadImage: (image) => {
            dispatch(uploadImage(image))
        },
        resetPopupState: () => {
            dispatch(resetPopupState())
        },
        deleteGroup: (id) => {
            dispatch(deleteGroup(id))
        },
        deletePerson: (id) => {
            dispatch(deletePerson(id))
        },
        addGroup: (values) => {
            dispatch(addGroup(values))
        },
        addPerson: (values) => {
            dispatch(addPerson(values))
        },
        addPersonToGroup: (values) => {
            dispatch(addPersonToGroup(values))
        },
        searchGroups: (query, groups) => {
            dispatch(searchGroups(query, groups))
        },
        resetSearchResults: () => {
            dispatch(resetSearchResults())
        },
        selectGroup: (group) => {
            dispatch(selectGroup(group))
        },
        searchPeople: (query, people) => {
            dispatch(searchPeople(query, people))
        },
        refreshItems: (selectedItem) => {
            dispatch(refreshItems(selectedItem))
        },
        relateGuardianToPerson: (values) => {
            dispatch(relateGuardianToPerson(values))
        },
        addGuardian: (values) => {
            dispatch(addGuardian(values))
        }
    }
};

export default reduxForm({
    form: 'popup'
})(connect(mapStateToProps, mapDispatchToProps)(PopupComponent));

