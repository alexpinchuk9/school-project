import { combineReducers } from 'redux';
import itemsReducer from "./itemsReducer";
import imageReducer from "./imageReducer";
import popupReducer from "./popupReducer";
import searchReducer from "./searchReducer";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    items: itemsReducer,
    form: formReducer,
    image: imageReducer,
    popup: popupReducer,
    search: searchReducer,
    login: loginReducer,
    user: userReducer
})
