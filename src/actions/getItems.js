import axios from "axios";
import {serverUrl} from "../constants/api";
import * as constants from "../constants/actionTypes/items";
import { getCookie } from "../utils/cookies";

export const getItems = () => {
    return (dispatch) => {

        dispatch({
            type: constants.GET_ITEMS_REQUEST
        });
        let bodyFormData = new FormData();
        bodyFormData.set('formName', 'getTree');
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
                    type: constants.GET_ITEMS_SUCCESS,
                    payload: response.data
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.GET_ITEMS_FAILURE,
                    error: {
                        message: 'Sorry, we couldn\'t get the items from the server'
                    }
                })
            });
    }
}
