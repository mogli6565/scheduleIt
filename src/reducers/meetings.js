import * as actions from './actions';
import {add, remove, update, getMeetings} from '../services/meetingService';

const meetings = (state = getMeetings(), action) => {
    let data;
    if(action.payload){
        var {meetings, room, meetingObj, id} = action.payload //using var to keep function scope
    }
    switch(action.type){
        case actions.ADD_MEETING:
            data = add(meetings, room, meetingObj);
            return {...data};
        case actions.EDIT_MEETING:
            data = update(meetings, room, id, meetingObj);
            return {...data};
        case actions.DELETE_MEETING:
            data = remove(meetings, room, id);
            return {...data};
        default:
            return state;
    }
};

export default meetings;