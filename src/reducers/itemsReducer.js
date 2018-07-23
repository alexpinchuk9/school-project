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

import filters from "../utils/filters";

const INITIAL_STATE = {
    items: {},
    selectedItem: null,
    previousParentItems: [],
    previousSelectedItem: null,
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

            const selectedItem = action.payload;
            let newPreviousParentItems = [...state.previousParentItems];
            const { items } = state;

            if (selectedItem.hasOwnProperty('surname')) {

                const dependantPeople = filters.filterDependantPeople(items, selectedItem);
                const containerGroups = filters.filterContainerGroupsForPeople(items, selectedItem);


                if (containerGroups.some(group => group.id === state.selectedItem.id) ||
                    dependantPeople.some(person => person.id === state.selectedItem.id)
                ) {
                    newPreviousParentItems.push(state.selectedItem);
                }
            } else if (state.previousSelectedItem) {

                const containerGroups = filters.filterContainerGroupsForGroup(items, selectedItem);


                if (containerGroups.some(group => group.id === state.selectedItem.id)) {
                    newPreviousParentItems.push(state.selectedItem);
                }
            }

            return {
                ...state,
                previousSelectedItem: state.selectedItem,
                selectedItem: action.payload,
                previousParentItems: newPreviousParentItems
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

            let newPreviousParentItems = [...state.previousParentItems];
            let newSelectedItem = state.items.groups[0];

            if(state.previousParentItems.length) {
                newSelectedItem = state.previousParentItems[state.previousParentItems.length - 1];
                newPreviousParentItems.pop();
            }


            return {
                ...state,
                selectedItem: newSelectedItem,
                previousParentItems: newPreviousParentItems
            };

        }

        default:
            return state;
    }
}

export default itemsReducer;
