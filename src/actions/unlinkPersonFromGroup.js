import * as constants from "../constants/actionTypes/unlinkPersonFromGroup";
import axios from "axios/index";
import {serverUrl} from "../constants/api";


export const unlinkPersonFromGroup = (values) => {

    return (dispatch) => {

        const {peopleId, groupsToDelete} = values;

        const unlinkPerson = (groupId) => {
            dispatch({
                type: constants.UNLINK_PERSON_FROM_GROUP_REQUEST,
                payload: groupId
            });

            let bodyFormData = new FormData();

            bodyFormData.set('formName', 'unrelateP2G');
            bodyFormData.set('peopleId', peopleId);
            bodyFormData.set('groupId', groupId);

            axios({
                method: 'post',
                url: serverUrl,
                data: bodyFormData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            })
        }

        axios.all(groupsToDelete.map(groupId => unlinkPerson(groupId)))
            .then(response => {
                dispatch({
                    type: constants.UNLINK_PERSON_FROM_GROUP_SUCCESS,
                    payload: "Group(s) have been unlinked"
                })
            })
            .catch(response => {
                dispatch({
                    type: constants.UNLINK_PERSON_FROM_GROUP_FAILURE,
                    error: response.error
                })
            });

    }

}
