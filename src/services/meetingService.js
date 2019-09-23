// initial state of the meeting rooms
const initialState = {
    A: [],
    B: [],
    C: []
};

export const getMeetings = () => JSON.parse(localStorage.getItem('meetings')) || initialState;

const saveMeetingsToLocalStorage = meetings => {
    localStorage.setItem('meetings', JSON.stringify(meetings));
};

// add a meeting
export const add = (meetings, room, meetingObj) => {
    meetings[room].push(meetingObj);
    saveMeetingsToLocalStorage(meetings);
    return meetings;
};

// remove a meeting
export const remove = (meetings, room, id) => {
    const filteredRoom = meetings[room].filter(item => item.id !== id);
    meetings[room] = filteredRoom;
    saveMeetingsToLocalStorage(meetings);
    return meetings;
};

// update a meeting
export const update = (meetings, room, id, meetingObj) => {
    const filteredRoom = meetings[room].filter(item => item.id !== id);
    filteredRoom.push({...meetingObj, id});
    meetings[room] = filteredRoom;
    saveMeetingsToLocalStorage(meetings);
    return meetings;
};