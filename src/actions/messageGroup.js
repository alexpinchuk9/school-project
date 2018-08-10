import axios from "axios";
import {serverUrl} from "../constants/api";
import * as constants from "../constants/actionTypes/messageGroup";
import {getCookie} from "../utils/cookies";

export const messageGroup = (id, message) => {
    return (dispatch) => {

        dispatch({
            type: constants.MESSAGE_GROUP_REQUEST
        });

        let bodyFormData = new FormData();

        bodyFormData.set('formName', 'sendMessageToGroup');
        bodyFormData.set('groupId', id);
        bodyFormData.set('txt', message);
        const sessionCode = getCookie('sessionCode');
        if (sessionCode) bodyFormData.set('sessionCode', sessionCode);

        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                dispatch({
                    type: constants.MESSAGE_GROUP_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.MESSAGE_GROUP_FAILURE,
                    error: response.error
                })
            });
    }
}
