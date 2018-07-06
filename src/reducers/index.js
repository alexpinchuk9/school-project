import { combineReducers } from 'redux';
import itemsReducer from "./itemsReducer";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    items: itemsReducer,
    form: formReducer
})
