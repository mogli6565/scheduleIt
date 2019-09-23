import {createStore, compose, combineReducers} from "redux";
import authUser from './authUser';
import meetings from './meetings';

const enhancers = compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const reducers = combineReducers({authUser, meetings});
let store = createStore(reducers,{},enhancers);

export default store;