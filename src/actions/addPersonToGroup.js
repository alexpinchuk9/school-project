import axios from "axios/index";
import {serverUrl} from "../constants/api";
import * as constants from "../constants/actionTypes/addPersonToGroup";
import {getCookie} from "../utils/cookies";

export const addPersonToGroup = (values) => {

    return (dispatch) => {

        dispatch({
            type: constants.ADD_PERSON_TO_GROUP_REQUEST
        })

        let bodyFormData = new FormData();
        const { personId, groupId, relation  } = values;

        bodyFormData.set('formName', 'relateP2G');
        bodyFormData.set('peopleId', personId);
        bodyFormData.set('groupId', groupId);
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
                dispatch({
                    type: constants.ADD_PERSON_TO_GROUP_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.ADD_PERSON_TO_GROUP_FAILURE,
                    error: response.error
                })
            });
    }
};
