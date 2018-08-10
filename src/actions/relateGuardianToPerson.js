import axios from "axios/index";
import {serverUrl} from "../constants/api";
import * as constants from "../constants/actionTypes/relateGuardianToPerson";
import {getCookie} from "../utils/cookies";

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
