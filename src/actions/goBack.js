import * as constants from "../constants/actionTypes/goBack";

export const goBack = () => {

    return (dispatch) => {

        dispatch({
            type: constants.GO_BACK
        })
    }
}
