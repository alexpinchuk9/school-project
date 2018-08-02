import * as constants from "../constants/actionTypes";

const INITIAL_STATE = {
    loading: false,
    serverResponse: null,
    error: null,
    open: false,
};

const popupReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {

        case constants.UPDATE_PERSON_REQUEST:
        case constants.UPDATE_GROUP_REQUEST:
        case constants.MESSAGE_PERSON_REQUEST:
        case constants.MESSAGE_GROUP_REQUEST:
        case constants.DELETE_GROUP_REQUEST:
        case constants.DELETE_PERSON_REQUEST:
        case constants.ADD_GROUP_REQUEST:
        case constants.ADD_PERSON_REQUEST:
        case constants.ADD_PERSON_TO_GROUP_REQUEST:
            return {...state, loading: true, error: null, serverResponse: null};

        case constants.UPDATE_PERSON_SUCCESS:
        case constants.UPDATE_GROUP_SUCCESS:
        case constants.MESSAGE_PERSON_SUCCESS:
        case constants.MESSAGE_GROUP_SUCCESS:
        case constants.DELETE_GROUP_SUCCESS:
        case constants.DELETE_PERSON_SUCCESS:
        case constants.ADD_GROUP_SUCCESS:
        case constants.ADD_PERSON_SUCCESS:
        case constants.ADD_PERSON_TO_GROUP_SUCCESS:
            return {...state, loading: false, serverResponse: action.payload, open: false, error: null};

        case constants.UPDATE_PERSON_FAILURE:
        case constants.UPDATE_GROUP_FAILURE:
        case constants.MESSAGE_PERSON_FAILURE:
        case constants.MESSAGE_GROUP_FAILURE:
        case constants.DELETE_GROUP_FAILURE:
        case constants.DELETE_PERSON_FAILURE:
        case constants.ADD_GROUP_FAILURE:
        case constants.ADD_PERSON_FAILURE:
        case constants.ADD_PERSON_TO_GROUP_FAILURE:
            return {...state, loading: false, error: action.payload, serverResponse: null};

        case constants.RESET_POPUP_STATE:
            return INITIAL_STATE;

        default:
            return state;
    }
}

export default popupReducer;
