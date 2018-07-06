import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
    SELECT_ITEM,
    UPDATE_PERSON_REQUEST,
    UPDATE_PERSON_SUCCESS,
    UPDATE_PERSON_FAILURE,
    UPDATE_GROUP_REQUEST,
    UPDATE_GROUP_SUCCESS,
    UPDATE_GROUP_FAILURE,
    MESSAGE_PERSON_REQUEST,
    MESSAGE_PERSON_SUCCESS,
    MESSAGE_PERSON_FAILURE,
    MESSAGE_GROUP_REQUEST,
    MESSAGE_GROUP_SUCCESS,
    MESSAGE_GROUP_FAILURE

} from '../constants/actionTypes';
import axios from 'axios';

export const getItems = () => {
    return (dispatch) => {
        dispatch({
            type: GET_ITEMS_REQUEST
        });
        let bodyFormData = new FormData();
        bodyFormData.set('formName', 'getTree');
        axios({
            method: 'post',
            url: 'http://www.tefenschool.org.il/contact/ajaxServer.php',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    payload: response.data
                })
            })
            .catch(response => {
                dispatch({
                    type: GET_ITEMS_FAILURE,
                    error: response.error
                })
            });
    }
}

export const selectItem = (item) => {
    return (dispatch) => {
        dispatch({
            type: SELECT_ITEM,
            payload: item
        })
    }
}

export const updatePerson = (id, values) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_PERSON_REQUEST
        });
        console.log('UPDATE PERSON', id, values);
        // TODO: make a request
        // let bodyFormData = new FormData();
        // bodyFormData.set('formName', 'getTree');
        // axios({
        //     method: 'post',
        //     url: 'http://www.tefenschool.org.il/contact/ajaxServer.php',
        //     data: bodyFormData,
        //     config: { headers: {'Content-Type': 'multipart/form-data' }}
        // })
        //     .then(response => {
        //         dispatch({
        //             type: UPDATE_PERSON_SUCCESS,
        //             payload: response.data
        //         })
        //     })
        //     .catch(response => {
        //         dispatch({
        //             type: UPDATE_PERSON_FAILURE,
        //             error: response.error
        //         })
        //     });
    }
}

export const updateGroup = (id, groupName) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_GROUP_REQUEST
        });
        console.log('UPDATE PERSON', id, groupName);
        // TODO: make a request
        // let bodyFormData = new FormData();
        // bodyFormData.set('formName', 'getTree');
        // axios({
        //     method: 'post',
        //     url: 'http://www.tefenschool.org.il/contact/ajaxServer.php',
        //     data: bodyFormData,
        //     config: { headers: {'Content-Type': 'multipart/form-data' }}
        // })
        //     .then(response => {
        //         dispatch({
        //             type: UPDATE_GROUP_SUCCESS,
        //             payload: response.data
        //         })
        //     })
        //     .catch(response => {
        //         dispatch({
        //             type: UPDATE_GROUP_FAILURE,
        //             error: response.error
        //         })
        //     });
    }
}

export const messagePerson = (id, message) => {
    return (dispatch) => {
        dispatch({
            type: MESSAGE_PERSON_REQUEST
        });
        console.log('MESSAGE PERSON', id, message);
        // TODO: make a request
        // let bodyFormData = new FormData();
        // bodyFormData.set('formName', 'getTree');
        // axios({
        //     method: 'post',
        //     url: 'http://www.tefenschool.org.il/contact/ajaxServer.php',
        //     data: bodyFormData,
        //     config: { headers: {'Content-Type': 'multipart/form-data' }}
        // })
        //     .then(response => {
        //         dispatch({
        //             type: MESSAGE_PERSON_SUCCESS,
        //             payload: response.data
        //         })
        //     })
        //     .catch(response => {
        //         dispatch({
        //             type: MESSAGE_PERSON_FAILURE,
        //             error: response.error
        //         })
        //     });
    }
}

export const messageGroup = (id, message) => {
    return (dispatch) => {
        dispatch({
            type: MESSAGE_GROUP_REQUEST
        });
        console.log('MESSAGE GROUP', id, message);
        // TODO: make a request
        // let bodyFormData = new FormData();
        // bodyFormData.set('formName', 'getTree');
        // axios({
        //     method: 'post',
        //     url: 'http://www.tefenschool.org.il/contact/ajaxServer.php',
        //     data: bodyFormData,
        //     config: { headers: {'Content-Type': 'multipart/form-data' }}
        // })
        //     .then(response => {
        //         dispatch({
        //             type: MESSAGE_PERSON_SUCCESS,
        //             payload: response.data
        //         })
        //     })
        //     .catch(response => {
        //         dispatch({
        //             type: MESSAGE_PERSON_FAILURE,
        //             error: response.error
        //         })
        //     });
    }
}
