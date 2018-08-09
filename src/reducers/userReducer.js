import * as constants from "../constants/actionTypes";
const INITIAL_STATE = {
    loginPeopleId: null,
    isAdmin: false,
    isStaff: false,
    user: null,
}

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case constants.GET_ITEMS_SUCCESS:
        case constants.REFRESH_ITEMS_SUCCESS:
            return {
                ...state,
                loginPeopleId: payload.loginPeopleId || null,
                isAdmin: payload.isAdmin === "1",
                isStaff: payload.isStaff === "1",
                user: payload.loginPeopleId ?
                    payload.people.filter(person => person.id === payload.loginPeopleId)[0] : null
            }
        default:
            return state;
    }
}
