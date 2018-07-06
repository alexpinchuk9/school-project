import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PopupComponent from "../components/PopupComponent";
import {messagePerson, messageGroup, updatePerson, updateGroup} from "../actions";



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
    }
};

export default reduxForm({
    form: 'popup'
})(connect(null, mapDispatchToProps)(PopupComponent));

