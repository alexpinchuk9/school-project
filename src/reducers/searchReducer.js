import {RESET_SEARCH_RESULTS, SEARCH_ITEMS} from "../constants/actionTypes";

const INITIAL_STATE = {
    query: "",
    peopleResults: [],
    groupResults: []
};

const searchReducer = (state = INITIAL_STATE, action) => {

    const { type, payload, items } = action;

    switch (type) {

        case SEARCH_ITEMS:

            const { groups, people } = items;

            const newGroupsResults = groups.filter(group => group.groupName.startsWith(payload));
            const newPeopleResults = people.filter(person => {
                return person.name.startsWith(payload) ||
                       person.surname.startsWith(payload) ||
                       `${person.name} ${person.surname}`.startsWith(payload) ||
                       `${person.surname} ${person.name}`.startsWith(payload);
            });

            return {
                ...state,
                peopleResults: newPeopleResults,
                groupResults: newGroupsResults,
                query: payload
            };

        case RESET_SEARCH_RESULTS:
            return {
                ...INITIAL_STATE
            };

        default:
            return state;
    }
};

export default searchReducer;
