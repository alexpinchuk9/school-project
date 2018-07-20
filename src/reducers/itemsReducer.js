import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
    SELECT_ITEM,
    REFRESH_ITEMS_SUCCESS,
    REFRESH_ITEMS_REQUEST,
    REFRESH_ITEMS_FAILURE,
    GO_BACK
} from '../constants/actionTypes';

const INITIAL_STATE = {
    items: {},
    selectedItem: null,
    previousSelectedItem: null,
    loading: false,
    error: null,
    shortcutItems: []
};

const itemsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_ITEMS_REQUEST:
            return {...state, loading: true, error: null };

        case GET_ITEMS_SUCCESS:

            let shortcutItemsIds = action.payload.g2g
                .filter(relation => relation.containerGroupId === "1")
                .map(relation => relation.containedGroupId);

            let shortcutItems = action.payload.groups
                .filter(group => shortcutItemsIds.some(id => id === group.id));

            return {
                ...state,
                items: action.payload,
                loading: false,
                error: null,
                selectedItem: action.payload.groups[0],
                shortcutItems: shortcutItems
            };

        case GET_ITEMS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case SELECT_ITEM:
            return {
                ...state,
                previousSelectedItem:
                state.selectedItem,
                selectedItem: action.payload
            };

        case REFRESH_ITEMS_REQUEST:
            return {...state, loading: true};

        case REFRESH_ITEMS_SUCCESS:

            let selectedItem = JSON.parse(localStorage.getItem("selectedItem"));
            let selectedItemId = selectedItem["id"];
            let selectedItemType = selectedItem["type"];
            let items = action.payload;
            let item;


            if (selectedItemType === "person") {
                item = items.people.filter(person => person.id === selectedItemId)[0];
            } else {
                item = items.groups.filter(group => group.id === selectedItemId)[0];
            }


            return { ...state, loading: false, items, selectedItem: item };

        case REFRESH_ITEMS_FAILURE:
            return { ...state, loading: false };

        case GO_BACK:
            return {
                ...state,
                selectedItem: state.previousSelectedItem,
                previousSelectedItem: state.selectedItem
            };

        default:
            return state;
    }
}

export default itemsReducer;
