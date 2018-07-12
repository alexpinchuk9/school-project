import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PopupComponent from "../components/PopupComponent";
import {
    messagePerson, 
    messageGroup, 
    updatePerson, 
    updateGroup,
    uploadImage
} from "../actions";

const mapStateToProps = (state) => {
    return {
        image: state.image
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
    }
};

export default reduxForm({
    form: 'popup'
})(connect(mapStateToProps, mapDispatchToProps)(PopupComponent));

