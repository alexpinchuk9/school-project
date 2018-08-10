import * as constants from "../constants/actionTypes/addGuardian"
import axios from 'axios';
import { serverUrl } from "../constants/api";
import {getCookie} from "../utils/cookies";

// TODO: deprecated api, should it be deleted?
export const relateGuardianToPerson = (values) => {

    return (dispatch) => {

        dispatch({
            type: constants.RELATE_GUARDIAN_TO_PERSON_REQUEST
        })

        let bodyFormData = new FormData();
        const { peopleId, guardianId, relation, guardianIndex  } = values;

        let searchForm = document.getElementById(`people-search-form-${guardianIndex}`);

        searchForm.classList.remove('add-guardian-success', 'add-guardian-failure');

        bodyFormData.set('formName', 'relateP2P');
        bodyFormData.set('peopleId', peopleId);
        bodyFormData.set('guardianId', guardianId);
        if (relation) bodyFormData.set('relation', relation);
        const sessionCode = getCookie('sessionCode');
        if (sessionCode) bodyFormData.set('sessionCode', sessionCode);

        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                searchForm.classList.add('add-guardian-success');
                dispatch({
                    type: constants.RELATE_GUARDIAN_TO_PERSON_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                searchForm.classList.add('add-guardian-failure');
                dispatch({
                    type: constants.RELATE_GUARDIAN_TO_PERSON_FAILURE,
                    error: response.error
                })
            });

    }
}

export const addGuardian = (values) => {

    return (dispatch) => {
        dispatch({
            type: constants.ADD_GUARDIAN_REQUEST
        });


        let bodyFormData = new FormData();
        const { guardianName, guardianSurname, guardianEmail, guardianCellphone, guardianNumber  } = values;

        bodyFormData.set('formName', 'addPeople');
        bodyFormData.set('name', guardianName);
        bodyFormData.set('surname', guardianSurname);
        bodyFormData.set('email', guardianEmail);
        bodyFormData.set('cellphone', guardianCellphone);
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
                    type: constants.ADD_GUARDIAN_SUCCESS,
                    guardianId: response.data,
                    guardianNumber,
                    guardianName,
                    guardianSurname
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.ADD_GUARDIAN_FAILURE,
                    error: response.error
                })
            });


    }
}

export const selectGuardian = (values) => {
    return (dispatch) => {
        const { guardianId, guardianName, guardianSurname, guardianNumber } = values;
        dispatch({
            type: constants.ADD_GUARDIAN_SUCCESS,
            guardianId,
            guardianName,
            guardianSurname,
            guardianNumber
        })
    }
}
