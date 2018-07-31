import * as constants from "../constants/actionTypes/items";

export const selectItem = (item) => {
    return (dispatch) => {
        dispatch({
            type: constants.SELECT_ITEM,
            payload: item
        })
    }
}
