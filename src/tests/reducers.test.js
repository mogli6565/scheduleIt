import meetings from '../reducers/meetings';
import * as actions from '../reducers/actions';

// default meetings state with one meeting in room A
const defaultMockState = {
    A: [{
        id: 1,
        title: "Interview with almog",
        startDate: "2019-09-26T05:00:00.000Z",
        endDate: "2019-09-26T05:30:00.000Z",
        user: "adrian",
        color: "#221B08"
    }],
    B: [],
    C: []
};

// object of new meeting that will be added
const newMeetingObj = {
    id: 2,
    title: "second interview with almog",
    startDate: "2019-09-27T05:00:00.000Z",
    endDate: "2019-09-27T05:30:00.000Z",
    user: "yossi",
    color: "#fff"
};


describe("Meetings Reducer", () => {
    describe("when adding a new meeting to the calender", () => {
        it("an ADD MEETING action adds a new meeting", () => {
            const addMeetingAction = {
                type: actions.ADD_MEETING,
                payload: {
                    meetings: defaultMockState,
                    room: 'B',
                    meetingObj: newMeetingObj
                },
            };
            const expectedState = {
                A: defaultMockState['A'],
                B: [newMeetingObj],
                C: []
            }
            expect(meetings(defaultMockState, addMeetingAction)).toEqual(expectedState);
        });
    });

    describe("when deleting a meeting from the calender", () => {
        it("an DELETE MEETING action remove the selected meeting", () => {
            const deleteMeetingAction = {
                type: actions.DELETE_MEETING,
                payload: {
                    meetings: defaultMockState,
                    room: 'A',
                    id: 1
                },
            };
            const expectedState = {A: [], B: [newMeetingObj], C: []};
            expect(meetings(defaultMockState, deleteMeetingAction)).toEqual(expectedState);
        });
    });
});