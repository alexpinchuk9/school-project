import axios from "axios/index";
import {serverUrl} from "../constants/api";
import * as constants from "../constants/actionTypes/items";
import {getCookie} from "../utils/cookies";

export const refreshItems = (selectedItem) => {

    return (dispatch) => {

        dispatch({
            type: constants.REFRESH_ITEMS_REQUEST
        });

        if(selectedItem.surname) {
            localStorage.setItem("selectedItem", JSON.stringify({type: "person", id: selectedItem.id}))
        } else {
            localStorage.setItem("selectedItem", JSON.stringify({type: "group", id: selectedItem.id}))
        }


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
                    type: constants.REFRESH_ITEMS_SUCCESS,
                    payload: response.data,
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.REFRESH_ITEMS_FAILURE,
                    error: {
                        message: 'Sorry, we couldn\'t get the items from the server'
                    }
                })
            });
    }
}
