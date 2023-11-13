import { combineReducers } from 'redux';
import articleReducer from "./articleReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
    articleReducer,
    userReducer,
});

export default reducers;
