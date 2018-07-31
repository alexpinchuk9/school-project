import * as constants from "../constants/actionTypes/selectGroup";

export const selectGroup = (group) => {

    return (dispatch) => {

        dispatch({
            type: constants.SELECT_GROUP,
            payload: group
        })
    }
};
