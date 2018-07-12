import { combineReducers } from 'redux';
import itemsReducer from "./itemsReducer";
import imageReducer from "./imageReducer";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    items: itemsReducer,
    form: formReducer,
    image: imageReducer
})
