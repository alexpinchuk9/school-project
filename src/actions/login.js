import axios from "axios";
import * as constants from "../constants/actionTypes/login";
import {serverUrl} from "../constants/api";
import { setCookie } from "../utils/cookies";

export const submitPhoneForLogin = data => {
    return (dispatch) => {

        dispatch({
            type: constants.SUBMIT_PHONE_FOR_LOGIN_REQUEST
        });
        const { phone } = data;
        let bodyFormData = new FormData();

        bodyFormData.set('formName', 'login');
        bodyFormData.set('cellphone', phone);

        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                dispatch({
                    type: constants.SUBMIT_PHONE_FOR_LOGIN_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.SUBMIT_PHONE_FOR_LOGIN_FAILURE,
                    error: response.error
                })
            });
    }
}

export const submitCodeForLogin = data => {

    return (dispatch) => {

        dispatch({
            type: constants.SUBMIT_CODE_FOR_LOGIN_REQUEST
        });
        const { phone, code } = data;
        let bodyFormData = new FormData();

        bodyFormData.set('formName', 'verifyCode');
        bodyFormData.set('cellphone', phone);
        bodyFormData.set('code', code);

        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                dispatch({
                    type: constants.SUBMIT_CODE_FOR_LOGIN_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.SUBMIT_CODE_FOR_LOGIN_FAILURE,
                    error: response.error
                })
            });
    }
}

export const setSessionCode = (sessionCode) => {
    setCookie('sessionCode', sessionCode)
    return {
        type: constants.SET_SESSION_CODE_SUCCESS,
        payload: sessionCode
    }
}

export const reinitLogin = () => ({
    type: constants.REINIT_LOGIN
})
