import axios from "axios";
import {serverUrl} from "../constants/api";
import * as constants from "../constants/actionTypes/updateGroup";

export const updateGroup = (id, groupName) => {
    return (dispatch) => {

        dispatch({
            type: constants.UPDATE_GROUP_REQUEST
        });

        let bodyFormData = new FormData();

        bodyFormData.set('formName', 'updateGroup');
        bodyFormData.set('id', id);
        bodyFormData.set('groupName', groupName);

        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                dispatch({
                    type: constants.UPDATE_GROUP_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.UPDATE_GROUP_FAILURE,
                    error: response.error
                })
            });
    }
}
