import * as constants from "../constants/actionTypes/login"
const INITIAL_STATE = {
    phone: '',
    phoneVerified: false,
    codeVerified: false,
    loading: false,
    error: null,
    serverResponse: null,
    sessionCode: null
}

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case constants.SUBMIT_PHONE_FOR_LOGIN_REQUEST:
        case constants.SUBMIT_CODE_FOR_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case constants.SUBMIT_PHONE_FOR_LOGIN_SUCCESS:
            if (payload === 'OK') {
                return {
                    ...state,
                    phone: payload,
                    phoneVerified: true
                }
            } else {
                return {
                    ...INITIAL_STATE,
                    serverResponse: payload
                }
            }


        case constants.SUBMIT_CODE_FOR_LOGIN_SUCCESS:

            if (payload.startsWith('OK')) {
                const newSessionCode = payload.split(' ')[1];

                return {
                    ...state,
                    codeVerified: true,
                    sessionCode: newSessionCode
                }
            } else {
                return {
                    ...INITIAL_STATE,
                    serverResponse: payload
                }
            }


        case constants.SUBMIT_CODE_FOR_LOGIN_FAILURE:
        case constants.SUBMIT_CODE_FOR_LOGIN_FAILURE:
            return {
                ...INITIAL_STATE,
                error: payload
            }

        case constants.REINIT_LOGIN:
            return {
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}
