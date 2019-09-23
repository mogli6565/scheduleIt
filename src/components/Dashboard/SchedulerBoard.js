import React from 'react';
import {connect} from 'react-redux'
import * as actions from "../../reducers/actions";
import Paper from '@material-ui/core/Paper';
import {ViewState, EditingState} from '@devexpress/dx-react-scheduler';
import {Scheduler, Toolbar, MonthView, WeekView, ViewSwitcher,
    Appointments, AppointmentForm, EditRecurrenceMenu} from '@devexpress/dx-react-scheduler-material-ui';
import {connectProps} from '@devexpress/dx-react-core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AppointmentFormContainer from './AppointmentFormContainer'
import {endDayHour, startDayHour, currentDate} from "../../constants/schedulingTimes";
import CustomAppointment from './CustomAppointment';
import {Legend, ColorBox} from "../../style/sharedStyle";
import Tooltip from '../Tooltip';
import {ADD_MEETING_TOOLTIP} from '../../constants/translations';

class SchedulerBoard extends React.Component {
    constructor(props) {
        super(props);
        const {meetings, room} = this.props;
        this.state = {
            data: meetings[room],
            confirmationVisible: false,
            editingFormVisible: false,
            deletedAppointmentId: undefined,
            editingAppointment: undefined,
            previousAppointment: undefined,
            addedAppointment: {},
            isNewAppointment: false,
        };

        this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
        this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
        this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

        this.commitChanges = this.commitChanges.bind(this);
        this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
        this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);

        this.appointmentForm = connectProps(AppointmentFormContainer, () => {
            const {
                editingFormVisible,
                editingAppointment,
                data,
                addedAppointment,
                isNewAppointment,
                previousAppointment,
            } = this.state;

            const currentAppointment = data
                    .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
                || addedAppointment;
            const cancelAppointment = () => {
                if (isNewAppointment) {
                    this.setState({
                        editingAppointment: previousAppointment,
                        isNewAppointment: false,
                    });
                }
            };

            return {
                visible: editingFormVisible,
                appointmentData: currentAppointment,
                commitChanges: this.commitChanges,
                visibleChange: this.toggleEditingFormVisibility,
                onEditingAppointmentChange: this.onEditingAppointmentChange,
                cancelAppointment,
                authUser: this.props.user
            };
        });
    }

    componentDidUpdate() {
        this.appointmentForm.update();
    }

    onEditingAppointmentChange(editingAppointment) {
        this.setState({editingAppointment});
    }

    onAddedAppointmentChange(addedAppointment) {
        this.setState({ addedAppointment });
        const { editingAppointment } = this.state;
        if (editingAppointment !== undefined) {
            this.setState({
                previousAppointment: editingAppointment,
            });
        }
        this.setState({ editingAppointment: undefined, isNewAppointment: true });
    }

    setDeletedAppointmentId(id) {
        this.setState({ deletedAppointmentId: id });
    }

    toggleEditingFormVisibility() {
        const { editingFormVisible } = this.state;
        this.setState({
            editingFormVisible: !editingFormVisible,
        });
    }

    toggleConfirmationVisible() {
        const { confirmationVisible } = this.state;
        this.setState({ confirmationVisible: !confirmationVisible });
    }

    commitDeletedAppointment() {
        this.setState((state) => {
            const {onRemoveMeeting, meetings, room} = this.props;
            const { data, deletedAppointmentId } = state;
            const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);
            onRemoveMeeting(meetings, room, deletedAppointmentId);

            return { data: nextData, deletedAppointmentId: null };
        });
        this.toggleConfirmationVisible();
    }

    commitChanges({added, changed, deleted}) {
        const {user, color, onAddMeeting, onEditMeeting, meetings, room} = this.props;
        this.setState((state) => {
            let {data} = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                const meetingObj = {id: startingAddedId, ...added, user, color};
                data = [...data, meetingObj];
                onAddMeeting(meetings, room, meetingObj);
            }
            if (changed) {
                data = data.map(appointment => (
                    changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
                const meetingObj = Object.values(changed)[0];
                onEditMeeting(meetings, room, meetingObj.id, meetingObj);
            }
            if (deleted !== undefined) {
                this.setDeletedAppointmentId(deleted);
                this.toggleConfirmationVisible();
            }
            return {data, addedAppointment: {}};
        });
    }

    render() {
        const {data, confirmationVisible, editingFormVisible} = this.state;
        return (
            <Paper>
                <Legend>
                    <ColorBox color={this.props.color} />
                    <span>My Meetings</span>
                    <Tooltip title={ADD_MEETING_TOOLTIP} />
                </Legend>
                <Scheduler
                    data={data}
                    height={440}
                >
                    <ViewState currentDate={currentDate} />
                    <EditingState
                        onCommitChanges={this.commitChanges}
                        onEditingAppointmentChange={this.onEditingAppointmentChange}
                        onAddedAppointmentChange={this.onAddedAppointmentChange}
                    />
                    <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
                    <MonthView />
                    <EditRecurrenceMenu />
                    <Appointments
                        appointmentContentComponent={({data}) =>
                            <CustomAppointment {...{data}}/>}
                    />
                    <Toolbar />
                    <ViewSwitcher />
                    <AppointmentForm
                        popupComponent={this.appointmentForm}
                        visible={editingFormVisible}
                        onVisibilityChange={this.toggleEditingFormVisibility}
                    />
                </Scheduler>

                <Dialog
                    open={confirmationVisible}
                    onClose={this.cancelDelete}
                >
                    <DialogTitle>
                        Delete Appointment
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this meeting?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        );
    }
}

// get meetings and auth user from the redux store
const mapStateToProps = ({meetings, authUser}) => {
    const user = authUser ? authUser.username : null;
    const color = authUser ? authUser.color : null;
    return ({meetings, user, color})
};

// get the actions to handle the meetings operations
const mapDispatchToProps = (dispatch) => {
    return {
        onAddMeeting: (meetings, room, meetingObj) =>
            dispatch({type: actions.ADD_MEETING, payload:{meetings, room, meetingObj}}),
        onRemoveMeeting: (meetings, room, id) =>
            dispatch({type: actions.DELETE_MEETING, payload:{meetings, room, id}}),
        onEditMeeting: (meetings, room, id, meetingObj) =>
            dispatch({type: actions.EDIT_MEETING, payload:{meetings, room, id, meetingObj}}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerBoard);