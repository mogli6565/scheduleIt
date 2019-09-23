import * as actions from './actions';

const authUser = (state = null, action) => {
    switch(action.type){
        case actions.USER_LOGGED_IN:
            return {...action.payload};
        case actions.USER_LOGGED_OUT:
            return null;
        default:
            return state;
    }
}

export default authUser;