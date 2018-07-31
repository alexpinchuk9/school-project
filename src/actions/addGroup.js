import axios from "axios";
import {serverUrl} from "../constants/api";
import * as constants from "../constants/actionTypes/addGroup"

export const addGroup = (values) => {
    return (dispatch) => {

        dispatch({
            type: constants.ADD_GROUP_REQUEST
        });


        let bodyFormData = new FormData();
        const { name, parentGroupId } = values;

        bodyFormData.set('formName', 'addGroup');
        bodyFormData.set('name', name);
        if (parentGroupId) bodyFormData.set('parentGroupId', parentGroupId);

        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                dispatch({
                    type: constants.ADD_GROUP_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.ADD_GROUP_FAILURE,
                    error: response.error
                })
            });
    }
}
