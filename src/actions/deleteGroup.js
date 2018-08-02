import axios from "axios";
import {serverUrl} from "../constants/api";
import * as constants from "../constants/actionTypes/deleteGroup";

export const deleteGroup = (id) => {
    return (dispatch) => {

        dispatch({
            type: constants.DELETE_GROUP_REQUEST
        });

        let bodyFormData = new FormData();

        bodyFormData.set('formName', 'deleteGroup');
        bodyFormData.set('groupId', id);

        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                dispatch({
                    type: constants.DELETE_GROUP_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.DELETE_GROUP_FAILURE,
                    error: response.error
                })
            });
    }
}
