import * as constants from '../constants/actionTypes/uploadImage';

const INITIAL_STATE = {
    imageUploading: false,
    name: null,
    error: null
};

const imageReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {

        case constants.UPLOAD_IMAGE_REQUEST:

            return {...state, imageUploading: true};

        case constants.UPLOAD_IMAGE_SUCCESS:
            return {...state, name: action.payload, imageUploading: false};

        case constants.UPLOAD_IMAGE_FAILURE:
            return {...state, imageUploading: false, name: null, error: action.payload};

        default:
            return state;
    }
}

export default imageReducer;
