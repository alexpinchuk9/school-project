import * as constants from "../constants/actionTypes/logout";
import axios from "axios";
import {serverUrl} from "../constants/api";
import {deleteCookie, getCookie} from "../utils/cookies";

export const logout = () => {

    return (dispatch) => {

        dispatch({
            type: constants.LOGOUT_REQUEST
        });


        let bodyFormData = new FormData();
        bodyFormData.set('formName', 'logout');
        const sessionCode = getCookie('sessionCode');
        if (sessionCode) bodyFormData.set('sessionCode', sessionCode);
        deleteCookie('sessionCode');

        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                dispatch({
                    type: constants.LOGOUT_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.LOGOUT_FAILURE,
                    error: response.error
                })
            });
    }

}
