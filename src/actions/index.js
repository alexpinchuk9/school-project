import axios from 'axios';

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
    MESSAGE_GROUP_FAILURE,
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE,
    RESET_POPUP_STATE,
    DELETE_GROUP_REQUEST,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_FAILURE,
    DELETE_PERSON_REQUEST,
    DELETE_PERSON_SUCCESS,
    DELETE_PERSON_FAILURE,
    ADD_GROUP_REQUEST,
    ADD_GROUP_SUCCESS,
    ADD_GROUP_FAILURE,
    ADD_PERSON_REQUEST,
    ADD_PERSON_SUCCESS,
    ADD_PERSON_FAILURE,
    REFRESH_ITEMS_REQUEST,
    REFRESH_ITEMS_SUCCESS,
    REFRESH_ITEMS_FAILURE,
    GO_BACK,
    SEARCH_ITEMS,
    RESET_SEARCH_RESULTS,
    ADD_PERSON_TO_GROUP_REQUEST,
    ADD_PERSON_TO_GROUP_SUCCESS,
    ADD_PERSON_TO_GROUP_FAILURE,
    SEARCH_GROUPS,
    SEARCH_PEOPLE,
    SELECT_GROUP,
    RELATE_GUARDIAN_TO_PERSON_REQUEST,
    RELATE_GUARDIAN_TO_PERSON_SUCCESS,
    RELATE_GUARDIAN_TO_PERSON_FAILURE, ADD_GUARDIAN_REQUEST, ADD_GUARDIAN_SUCCESS, ADD_GUARDIAN_FAILURE
} from '../constants/actionTypes';
import { serverUrl } from "../constants/api";

export const getItems = () => {
    return (dispatch) => {

        dispatch({
            type: GET_ITEMS_REQUEST
        });
        let bodyFormData = new FormData();
        bodyFormData.set('formName', 'getTree');
        axios({
            method: 'post',
            url: serverUrl,
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
                    error: {
                        message: 'Sorry, we couldn\'t get the items from the server'
                    }
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

export const uploadImage = (image) => {

    return(dispatch) => {

        dispatch({
            type: UPLOAD_IMAGE_REQUEST,
            payload: image
        });

        let formImageRow = document.getElementsByClassName("form-image-row")[0];
        let submitButton = document.getElementsByClassName("button-submit")[0];

        formImageRow.classList.remove('upload-success', 'upload-failure');
        submitButton.classList.add('upload-request');
        submitButton.innerText = "בטעינה...";

        const MAX_HEIGHT = 256;

        const resize = (src) => {
            return new Promise(function(resolve, reject) {
                let image = new Image();

                image.onload = function(){
                    let canvas = document.createElement('canvas');
                    if(image.height > MAX_HEIGHT) {
                        image.width *= MAX_HEIGHT / image.height;
                        image.height = MAX_HEIGHT;
                    }
                    let ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    let result = canvas.toDataURL("image/jpeg");
                    resolve(result);
                };
                image.src = src;
            })

        }

        const getBase64 = (file, onLoadCallback) => {
            return new Promise(function(resolve, reject) {
                var reader = new FileReader();
                reader.onload = function() {
                    let promise = resize(reader.result);
                    promise.then(result => resolve(result));
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }


        let promise = getBase64(image);

        promise.then(result => {

            let base64result = result.split(',')[1];
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function(ev) {
                if (this.readyState === 4 && this.status === 200) {

                    submitButton.classList.remove('upload-request');
                    submitButton.innerText = "עדכון";
                    formImageRow.classList.add('upload-success');

                    dispatch({
                        type: UPLOAD_IMAGE_SUCCESS,
                        payload: this.response
                    });

                } else if ( this.readyState === 4) {

                    submitButton.classList.remove('upload-request');
                    submitButton.innerText = "עדכון";
                    formImageRow.classList.add('upload-failure');

                    dispatch({
                        type: UPLOAD_IMAGE_FAILURE,
                        error: this.error
                    });
                }
            };

            xhr.open("POST", serverUrl, true);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            let data =  "&pic=" + base64result;
            xhr.send(data);
        });
    }
}

export const updatePerson = (id, values) => {
    return (dispatch) => {

        dispatch({
            type: UPDATE_PERSON_REQUEST
        });

        const {
            name,
            surname,
            email,
            cellphone,
            picture,
            guardianId1,
            relation1,
            guardianId2,
            relation2,
            guardianId3,
            relation3,
            guardianId4,
            relation4
        } = values;
        let bodyFormData = new FormData();

        bodyFormData.set('formName', 'updatePerson');
        bodyFormData.set('id', id);
        bodyFormData.set('name', name);
        bodyFormData.set('surname', surname);
        bodyFormData.set('email', email);
        bodyFormData.set('cellphone', cellphone);
        bodyFormData.set('pic', picture);
        bodyFormData.set('guardianId1', guardianId1);
        bodyFormData.set('relation1', relation1);
        bodyFormData.set('guardianId2', guardianId2);
        bodyFormData.set('relation2', relation2);
        bodyFormData.set('guardianId3', guardianId3);
        bodyFormData.set('relation3', relation3);
        bodyFormData.set('guardianId4', guardianId4);
        bodyFormData.set('relation4', relation4);


        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                dispatch({
                    type: UPDATE_PERSON_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: UPDATE_PERSON_FAILURE,
                    error: response.error
                })
            });
    }
}

export const updateGroup = (id, groupName) => {
    return (dispatch) => {

        dispatch({
            type: UPDATE_GROUP_REQUEST
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
                    type: UPDATE_GROUP_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: UPDATE_GROUP_FAILURE,
                    error: response.error
                })
            });
    }
}

export const messagePerson = (id, message) => {
    return (dispatch) => {

        dispatch({
            type: MESSAGE_PERSON_REQUEST
        });

        let bodyFormData = new FormData();

        bodyFormData.set('formName', 'sendMessageToPeople');
        bodyFormData.set('peopleId', id);
        bodyFormData.set('txt', message);

        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                dispatch({
                    type: MESSAGE_PERSON_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: MESSAGE_PERSON_FAILURE,
                    error: response.error
                })
            });
    }
}

export const messageGroup = (id, message) => {
    return (dispatch) => {

        dispatch({
            type: MESSAGE_GROUP_REQUEST
        });

        let bodyFormData = new FormData();

        bodyFormData.set('formName', 'sendMessageToGroup');
        bodyFormData.set('groupId', id);
        bodyFormData.set('txt', message);

        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                dispatch({
                    type: MESSAGE_GROUP_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: MESSAGE_GROUP_FAILURE,
                    error: response.error
                })
            });
    }
}

export const resetPopupState = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_POPUP_STATE
        })
    }
}

export const deleteGroup = (id) => {
    return (dispatch) => {

        dispatch({
            type: DELETE_GROUP_REQUEST
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
                    type: DELETE_GROUP_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: DELETE_GROUP_FAILURE,
                    error: response.error
                })
            });
    }
}

export const deletePerson = (id) => {
    return (dispatch) => {

        dispatch({
            type: DELETE_PERSON_REQUEST
        });

        let bodyFormData = new FormData();

        bodyFormData.set('formName', 'deletePeople');
        bodyFormData.set('peopleId', id);

        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                dispatch({
                    type: DELETE_PERSON_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: DELETE_PERSON_FAILURE,
                    error: response.error
                })
            });
    }
}


export const addGroup = (values) => {
    return (dispatch) => {

        dispatch({
            type: ADD_GROUP_REQUEST
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
                    type: ADD_GROUP_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: ADD_GROUP_FAILURE,
                    error: response.error
                })
            });
    }
}


export const addPerson = (values) => {
    return (dispatch) => {

        dispatch({
            type: ADD_PERSON_REQUEST
        });

        let bodyFormData = new FormData();
        const {
            name,
            surname,
            cellphone,
            email,
            pic,
            groupId,
            guardianId1,
            relation1,
            guardianId2,
            relation2,
            guardianId3,
            relation3,
            guardianId4,
            relation4  } = values;

            console.log(values)

        bodyFormData.set('formName', 'addPeople');
        bodyFormData.set('groupId', groupId);
        bodyFormData.set('name', name);
        bodyFormData.set('surname', surname);
        bodyFormData.set('email', email);
        bodyFormData.set('cellphone', cellphone);
        bodyFormData.set('pic', pic);
        bodyFormData.set('guardianId1', guardianId1);
        bodyFormData.set('relation1', relation1);
        bodyFormData.set('guardianId2', guardianId2);
        bodyFormData.set('relation2', relation2);
        bodyFormData.set('guardianId3', guardianId3);
        bodyFormData.set('relation3', relation3);
        bodyFormData.set('guardianId4', guardianId4);
        bodyFormData.set('relation4', relation4);


        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                console.log(response)
                dispatch({
                    type: ADD_PERSON_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                dispatch({
                    type: ADD_PERSON_FAILURE,
                    error: response.error
                })
            });
    }
}

export const refreshItems = (selectedItem) => {

    return (dispatch) => {

        dispatch({
            type: REFRESH_ITEMS_REQUEST
        });

        if(selectedItem.surname) {
            localStorage.setItem("selectedItem", JSON.stringify({type: "person", id: selectedItem.id}))
        } else {
            localStorage.setItem("selectedItem", JSON.stringify({type: "group", id: selectedItem.id}))
        }


        let bodyFormData = new FormData();
        bodyFormData.set('formName', 'getTree');
        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                dispatch({
                    type: REFRESH_ITEMS_SUCCESS,
                    payload: response.data,
                })
            })
            .catch(response => {
                dispatch({
                    type: REFRESH_ITEMS_FAILURE,
                    error: {
                        message: 'Sorry, we couldn\'t get the items from the server'
                    }
                })
            });
    }
}

export const goBack = () => {

    return (dispatch) => {

        dispatch({
            type: GO_BACK
        })
    }
}

export const searchItems = (query, items) => {

    return (dispatch) => {

        dispatch({
            type: SEARCH_ITEMS,
            payload: query,
            items: items
        })
    }
}


export const searchGroups = (query, groups) => {

    return (dispatch) => {

        dispatch({
            type: SEARCH_GROUPS,
            payload: query,
            groups: groups
        })
    }
}

export const searchPeople = (query, people) => {

    return (dispatch) => {

        dispatch({
            type: SEARCH_PEOPLE,
            payload: query,
            people: people
        })
    }
}

export const resetSearchResults = () => {

    return (dispatch) => {

        dispatch({
            type: RESET_SEARCH_RESULTS
        })
    }
}

export const addPersonToGroup = (values) => {

     return (dispatch) => {

         dispatch({
             type: ADD_PERSON_TO_GROUP_REQUEST
         })

         let bodyFormData = new FormData();
         const { peopleId, groupId, relation  } = values;

         bodyFormData.set('formName', 'relateP2G');
         bodyFormData.set('peopleId', peopleId);
         bodyFormData.set('groupId', groupId);
         if (relation) bodyFormData.set('relation', relation);

         axios({
             method: 'post',
             url: serverUrl,
             data: bodyFormData,
             config: { headers: {'Content-Type': 'multipart/form-data' }}
         })
             .then(response => {
                 dispatch({
                     type: ADD_PERSON_TO_GROUP_SUCCESS,
                     payload: response.data ? response.data : response.statusText
                 })
             })
             .catch(response => {
                 dispatch({
                     type: ADD_PERSON_TO_GROUP_FAILURE,
                     error: response.error
                 })
             });
     }
};

export const selectGroup = (group) => {

    return (dispatch) => {

        dispatch({
            type: SELECT_GROUP,
            payload: group
        })
    }
};


export const relateGuardianToPerson = (values) => {

    return (dispatch) => {

        dispatch({
            type: RELATE_GUARDIAN_TO_PERSON_REQUEST
        })


        let bodyFormData = new FormData();
        const { peopleId, guardianId, relation, guardianIndex  } = values;

        let searchForm = document.getElementById(`people-search-form-${guardianIndex}`);

        searchForm.classList.remove('add-guardian-success', 'add-guardian-failure');

        bodyFormData.set('formName', 'relateP2P');
        bodyFormData.set('peopleId', peopleId);
        bodyFormData.set('guardianId', guardianId);
        if (relation) bodyFormData.set('relation', relation);

        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                searchForm.classList.add('add-guardian-success');
                dispatch({
                    type: RELATE_GUARDIAN_TO_PERSON_SUCCESS,
                    payload: response.data ? response.data : response.statusText
                })
            })
            .catch(response => {
                searchForm.classList.add('add-guardian-failure');
                dispatch({
                    type: RELATE_GUARDIAN_TO_PERSON_FAILURE,
                    error: response.error
                })
            });

    }
}

export const addGuardian = (values) => {

    return (dispatch) => {
        dispatch({
            type: ADD_GUARDIAN_REQUEST
        });


        let bodyFormData = new FormData();
        const { guardianName, guardianSurname, guardianEmail, guardianCellphone, guardianNumber  } = values;

        bodyFormData.set('formName', 'addPeople');
        bodyFormData.set('name', guardianName);
        bodyFormData.set('surname', guardianSurname);
        bodyFormData.set('email', guardianEmail);
        bodyFormData.set('cellphone', guardianCellphone);

        axios({
            method: 'post',
            url: serverUrl,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(response => {
                console.log(response);
                dispatch({
                    type: ADD_GUARDIAN_SUCCESS,
                    guardianId: response.data,
                    guardianNumber,
                    guardianName,
                    guardianSurname
                })
            })
            .catch(response => {
                dispatch({
                    type: ADD_GUARDIAN_FAILURE,
                    error: response.error
                })
            });


        }
}

export const selectGuardian = (values) => {
    return (dispatch) => {
        const { guardianId, guardianName, guardianSurname, guardianNumber } = values;
        dispatch({
            type: ADD_GUARDIAN_SUCCESS,
            guardianId,
            guardianName,
            guardianSurname,
            guardianNumber
        })
    }
}
