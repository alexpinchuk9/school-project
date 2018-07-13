import { combineReducers } from 'redux';
import itemsReducer from "./itemsReducer";
import imageReducer from "./imageReducer";
import popupReducer from "./popupReducer";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    items: itemsReducer,
    form: formReducer,
    image: imageReducer,
    popup: popupReducer
})
