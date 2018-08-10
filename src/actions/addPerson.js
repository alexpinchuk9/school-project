import axios from "axios/index";
import {serverUrl} from "../constants/api";
import * as constants from "../constants/actionTypes/addPerson";
import {getCookie} from "../utils/cookies";

export const addPerson = (values) => {
    return (dispatch) => {

        dispatch({
            type: constants.ADD_PERSON_REQUEST
        });

        let bodyFormData = new FormData();
        const { name, surname, cellphone, email, pic, groupId  } = values;

        bodyFormData.set('formName', 'addPeople');
        bodyFormData.set('groupId', groupId);
        bodyFormData.set('name', name);
        bodyFormData.set('surname', surname);
        bodyFormData.set('email', email);
        bodyFormData.set('cellphone', cellphone);
        bodyFormData.set('pic', pic);
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
                    type: constants.ADD_PERSON_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.ADD_PERSON_FAILURE,
                    error: response.error
                })
            });
    }
}
