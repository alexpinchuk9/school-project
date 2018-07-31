import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
    SELECT_ITEM,
    REFRESH_ITEMS_SUCCESS,
    REFRESH_ITEMS_REQUEST,
    REFRESH_ITEMS_FAILURE,
} from '../constants/actionTypes/items';
import { GO_BACK } from "../constants/actionTypes/goBack";

const INITIAL_STATE = {
    items: {},
    selectedItem: null,
    previousSelectedItems: [],
    loading: false,
    error: null,
    homeItem: null
};

const itemsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case GET_ITEMS_REQUEST:
            return {...state, loading: true, error: null };

        case GET_ITEMS_SUCCESS:

            return {
                ...state,
                items: action.payload,
                loading: false,
                error: null,
                selectedItem: action.payload.groups[0],
                previousSelectedItem: null,
                homeItem: action.payload.groups[0]
            };

        case GET_ITEMS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case SELECT_ITEM: {

            const newSelectedItem = action.payload;
            const newPreviousSelectedItem = state.selectedItem;
            let newPreviousSelectedItems = [...state.previousSelectedItems, newPreviousSelectedItem];

            return {
                ...state,
                selectedItem: newSelectedItem,
                previousSelectedItems: newPreviousSelectedItems
            };
        }

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

        case GO_BACK: {

            let newPreviousSelectedItems = [...state.previousSelectedItems];
            let newSelectedItem = state.items.groups[0];

            if(state.previousSelectedItems.length) {
                newSelectedItem = state.previousSelectedItems[state.previousSelectedItems.length - 1];
                newPreviousSelectedItems.pop();
            }


            return {
                ...state,
                selectedItem: newSelectedItem,
                previousSelectedItems: newPreviousSelectedItems
            };

        }

        default:
            return state;
    }
}

export default itemsReducer;
