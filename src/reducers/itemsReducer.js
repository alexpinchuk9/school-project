import { GET_ITEMS_REQUEST,
         GET_ITEMS_SUCCESS,
         GET_ITEMS_FAILURE,
         SELECT_ITEM } from '../constants/actionTypes';

const INITIAL_STATE = {
    items: {},
    selectedItem: null,
    loading: false,
    error: null
};

const itemsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_ITEMS_REQUEST:
            return {...state, loading: true, error: null };

        case GET_ITEMS_SUCCESS:
            return {...state, items: action.payload, loading: false, error: null, selectedItem: action.payload.groups[0]};

        case GET_ITEMS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case SELECT_ITEM:
            return {...state, selectedItem: action.payload};

        default:
            return state;
    }
}

export default itemsReducer;
