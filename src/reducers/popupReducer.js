import {
    UPDATE_PERSON_REQUEST,
    UPDATE_PERSON_SUCCESS,
    UPDATE_PERSON_FAILURE,
} from "../constants/actionTypes/updatePerson";
import {
    UPDATE_GROUP_REQUEST,
    UPDATE_GROUP_SUCCESS,
    UPDATE_GROUP_FAILURE,
} from "../constants/actionTypes/updateGroup";
import {
    MESSAGE_PERSON_REQUEST,
    MESSAGE_PERSON_SUCCESS,
    MESSAGE_PERSON_FAILURE,
} from "../constants/actionTypes/messagePerson";
import {
    MESSAGE_GROUP_REQUEST,
    MESSAGE_GROUP_SUCCESS,
    MESSAGE_GROUP_FAILURE,
} from "../constants/actionTypes/messageGroup";
import {
    RESET_POPUP_STATE
} from "../constants/actionTypes/resetPopup";
import {
    DELETE_PERSON_REQUEST,
    DELETE_PERSON_SUCCESS,
    DELETE_PERSON_FAILURE,
} from "../constants/actionTypes/deletePerson";
import {
    DELETE_GROUP_REQUEST,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_FAILURE,
} from "../constants/actionTypes/deleteGroup";
import {
    ADD_GROUP_REQUEST,
    ADD_GROUP_SUCCESS,
    ADD_GROUP_FAILURE,
} from "../constants/actionTypes/addGroup";
import {
    ADD_PERSON_REQUEST,
    ADD_PERSON_SUCCESS,
    ADD_PERSON_FAILURE
} from "../constants/actionTypes/addPerson";
import {
    ADD_PERSON_TO_GROUP_REQUEST,
    ADD_PERSON_TO_GROUP_SUCCESS,
    ADD_PERSON_TO_GROUP_FAILURE
} from "../constants/actionTypes/addPersonToGroup"

const INITIAL_STATE = {
    loading: false,
    serverResponse: null,
    error: null,
    open: false,
};

const popupReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {

        case UPDATE_PERSON_REQUEST:
        case UPDATE_GROUP_REQUEST:
        case MESSAGE_PERSON_REQUEST:
        case MESSAGE_GROUP_REQUEST:
        case DELETE_GROUP_REQUEST:
        case DELETE_PERSON_REQUEST:
        case ADD_GROUP_REQUEST:
        case ADD_PERSON_REQUEST:
        case ADD_PERSON_TO_GROUP_REQUEST:
            return {...state, loading: true, error: null, serverResponse: null};

        case UPDATE_PERSON_SUCCESS:
        case UPDATE_GROUP_SUCCESS:
        case MESSAGE_PERSON_SUCCESS:
        case MESSAGE_GROUP_SUCCESS:
        case DELETE_GROUP_SUCCESS:
        case DELETE_PERSON_SUCCESS:
        case ADD_GROUP_SUCCESS:
        case ADD_PERSON_SUCCESS:
        case ADD_PERSON_TO_GROUP_SUCCESS:
            return {...state, loading: false, serverResponse: action.payload, open: false, error: null};

        case UPDATE_PERSON_FAILURE:
        case UPDATE_GROUP_FAILURE:
        case MESSAGE_PERSON_FAILURE:
        case MESSAGE_GROUP_FAILURE:
        case DELETE_GROUP_FAILURE:
        case DELETE_PERSON_FAILURE:
        case ADD_GROUP_FAILURE:
        case ADD_PERSON_FAILURE:
        case ADD_PERSON_TO_GROUP_FAILURE:
            return {...state, loading: false, error: action.payload, serverResponse: null};

        case RESET_POPUP_STATE:
            return INITIAL_STATE;

        default:
            return state;
    }
}

export default popupReducer;
