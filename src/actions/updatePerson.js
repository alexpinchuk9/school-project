import axios from "axios";
import {serverUrl} from "../constants/api";
import * as constants from "../constants/actionTypes/updatePerson";

export const updatePerson = (id, values) => {
    return (dispatch) => {

        dispatch({
            type: constants.UPDATE_PERSON_REQUEST
        });

        const { name, surname, email, cellphone, picture } = values;
        let bodyFormData = new FormData();

        bodyFormData.set('formName', 'updatePerson');
        bodyFormData.set('id', id);
        bodyFormData.set('name', name);
        bodyFormData.set('surname', surname);
        bodyFormData.set('email', email);
        bodyFormData.set('cellphone', cellphone);
        bodyFormData.set('picture', picture)


        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                dispatch({
                    type: constants.UPDATE_PERSON_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.UPDATE_PERSON_FAILURE,
                    error: response.error
                })
            });
    }
}
