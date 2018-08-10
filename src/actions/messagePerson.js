import axios from "axios";
import {serverUrl} from "../constants/api";
import * as constants from "../constants/actionTypes/messagePerson";
import {getCookie} from "../utils/cookies";

export const messagePerson = (id, message) => {
    return (dispatch) => {

        dispatch({
            type: constants.MESSAGE_PERSON_REQUEST
        });

        let bodyFormData = new FormData();

        bodyFormData.set('formName', 'sendMessageToPeople');
        bodyFormData.set('peopleId', id);
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
                    type: constants.MESSAGE_PERSON_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.MESSAGE_PERSON_FAILURE,
                    error: response.error
                })
            });
    }
}
