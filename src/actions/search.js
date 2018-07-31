import * as constants from "../constants/actionTypes/search";

export const searchItems = (query, items) => {

    return (dispatch) => {

        dispatch({
            type: constants.SEARCH_ITEMS,
            payload: query,
            items: items
        })
    }
}


export const searchGroups = (query, groups) => {

    return (dispatch) => {

        dispatch({
            type: constants.SEARCH_GROUPS,
            payload: query,
            groups: groups
        })
    }
}

export const searchPeople = (query, people) => {

    return (dispatch) => {

        dispatch({
            type: constants.SEARCH_PEOPLE,
            payload: query,
            people: people
        })
    }
}

export const resetSearchResults = () => {

    return (dispatch) => {

        dispatch({
            type: constants.RESET_SEARCH_RESULTS
        })
    }
}
