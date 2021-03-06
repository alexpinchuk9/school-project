import {
    RESET_SEARCH_RESULTS,
    SEARCH_ITEMS,
    SEARCH_PEOPLE,
    SEARCH_GROUPS,
    SELECT_GROUP
} from "../constants/actionTypes";

const INITIAL_STATE = {
    peopleResults: [],
    groupResults: [],
    itemResults: [],
    lastSelectedGroup: null
};

const searchReducer = (state = INITIAL_STATE, action) => {

    const { type, payload, items } = action;

    switch (type) {

        case SEARCH_ITEMS: {

            const { groups, people } = items;

            const newGroupsResults = groups.filter(group => group.groupName.startsWith(payload));
            const newPeopleResults = people.filter(person => {
                return person.name.startsWith(payload) ||
                    person.surname.startsWith(payload) ||
                    `${person.name} ${person.surname}`.startsWith(payload) ||
                    `${person.surname} ${person.name}`.startsWith(payload);
            });

            const newItemResults = [...newPeopleResults, ...newGroupsResults];

            return {
                ...state,
                itemResults: newItemResults
            };

        }


        case SEARCH_GROUPS: {

            const { groups } = action;


            const newGroupResults = groups.filter(group => group.groupName.startsWith(payload));

            return {
                ...state,
                groupResults: newGroupResults
            }
        }

        case SEARCH_PEOPLE: {

            const { people } = action;


            const newPeopleResults = people.filter(person => {
                return person.name.startsWith(payload) ||
                    person.surname.startsWith(payload) ||
                    `${person.name} ${person.surname}`.startsWith(payload) ||
                    `${person.surname} ${person.name}`.startsWith(payload);
            });

            return {
                ...state,
                peopleResults: newPeopleResults
            }
        }


        case RESET_SEARCH_RESULTS:
            return {
                ...INITIAL_STATE,
                lastSelectedGroup: state.lastSelectedGroup
            };

        case SELECT_GROUP:
            return {
                ...state,
                lastSelectedGroup: action.payload
            }

        default:
            return state;
    }
};

export default searchReducer;
