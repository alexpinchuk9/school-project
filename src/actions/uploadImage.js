import {serverUrl} from "../constants/api";
import * as constants from "../constants/actionTypes/uploadImage";

import getBase64 from "../utils/getBase64";

export const uploadImage = (image) => {

    return(dispatch) => {

        dispatch({
            type: constants.UPLOAD_IMAGE_REQUEST,
            payload: image
        });

        let formImageRow = document.getElementsByClassName("form-image-row")[0];
        let submitButton = document.getElementsByClassName("button-submit")[0];

        formImageRow.classList.remove('upload-success', 'upload-failure');
        submitButton.classList.add('upload-request');
        submitButton.innerText = "בטעינה...";


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
                        type: constants.UPLOAD_IMAGE_SUCCESS,
                        payload: this.response
                    });

                } else if ( this.readyState === 4) {

                    submitButton.classList.remove('upload-request');
                    submitButton.innerText = "עדכון";
                    formImageRow.classList.add('upload-failure');

                    dispatch({
                        type: constants.UPLOAD_IMAGE_FAILURE,
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
