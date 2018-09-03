import axios from "axios";
import {serverUrl} from "../constants/api";
import * as constants from "../constants/actionTypes/updatePerson";
import {getCookie} from "../utils/cookies";

export const updatePerson = (id, values) => {
    return (dispatch) => {

        dispatch({
            type: constants.UPDATE_PERSON_REQUEST
        });

        const {
            name,
            surname,
            email,
            cellphone,
            picture,
            guardianId1,
            relation1,
            guardianId2,
            relation2,
            guardianId3,
            relation3,
            guardianId4,
            relation4, } = values;
        let bodyFormData = new FormData();

        bodyFormData.set('formName', 'updatePerson');
        bodyFormData.set('id', id);
        bodyFormData.set('name', name);
        bodyFormData.set('surname', surname);
        bodyFormData.set('email', email);
        bodyFormData.set('cellphone', cellphone);
        bodyFormData.set('picture', picture);
        if (guardianId1 && guardianId1 !== 'null') {
            bodyFormData.set('guardianId1', guardianId1);
            bodyFormData.set('relation1', relation1)
        }
        if (guardianId2 && guardianId2 !== 'null') {
            bodyFormData.set('guardianId2', guardianId2);
            bodyFormData.set('relation2', relation2)
        }
        if (guardianId3 && guardianId3 !== 'null') {
            bodyFormData.set('guardianId3', guardianId3);
            bodyFormData.set('relation3', relation3)
        }
        if (guardianId4 && guardianId4 !== 'null') {
            bodyFormData.set('guardianId4', guardianId4);
            bodyFormData.set('relation4', relation4)
        }
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
