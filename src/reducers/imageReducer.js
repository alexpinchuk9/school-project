import { UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_FAILURE, UPLOAD_IMAGE_SUCCESS } from '../constants/actionTypes';

const INITIAL_STATE = {
    imageUploading: false,
    name: null,
    error: null
};

const imageReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UPLOAD_IMAGE_REQUEST:
            return {...state, imageUploading: true, name: action.payload};

        case UPLOAD_IMAGE_SUCCESS:
            return {...state, imageUploading: false};

        case UPLOAD_IMAGE_FAILURE:
            return {...state, imageUploading: false, name: null, error: action.payload}

        default:
            return state;
    }
}

export default imageReducer;
