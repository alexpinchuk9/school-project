import * as constants from "../constants/actionTypes/resetPopup";

export const resetPopupState = () => {
    return (dispatch) => {
        dispatch({
            type: constants.RESET_POPUP_STATE
        })
    }
}
