import React from "react";
import styled from 'styled-components';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Close from "@material-ui/core/SvgIcon/SvgIcon";
import TextField from "@material-ui/core/TextField/TextField";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import Button from "@material-ui/core/Button/Button";
import {withStyles} from "@material-ui/core";
import Notes from '@material-ui/icons/Notes';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';
import {AppointmentForm} from '@devexpress/dx-react-scheduler-material-ui';
import {containerStyles} from './containerStyles';
import Fade from 'react-reveal/Fade';
import {OTHER_USER_MEETING} from '../../constants/translations'

const Warning = styled.div`
    position: relative;
    top: 20px;
    text-align: center;
    color: darkred;
`

const Headline = styled.div`
  color: #5b6980;
  font-family: 'Ubuntu', sans-serif;
  font-size: 26px;
  text-align: center;
  position: relative;
  top: 20px;
`

class AppointmentFormContainerBasic extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            appointmentChanges: {},
        };

        this.getAppointmentData = () => this.props.appointmentData;
        this.getAppointmentChanges = () => this.state.appointmentChanges;

        this.changeAppointment = this.changeAppointment.bind(this);
        this.commitAppointment = this.commitAppointment.bind(this);
    }

    changeAppointment({field, changes}) {
        const nextChanges = {
            ...this.getAppointmentChanges(),
            [field]: changes,
        };
        this.setState({
            appointmentChanges: nextChanges,
        });
    }

    commitAppointment(type) {
        const {commitChanges} = this.props;
        const appointment = {
            ...this.getAppointmentData(),
            ...this.getAppointmentChanges(),
        };
        if (type === 'deleted') {
            commitChanges({ [type]: appointment.id });
        } else if (type === 'changed') {
            commitChanges({ [type]: { [appointment.id]: appointment } });
        } else {
            commitChanges({ [type]: appointment });
        }
        this.setState({
            appointmentChanges: {},
        });
    }

    render() {
        const {
            classes,
            visible,
            visibleChange,
            appointmentData,
            cancelAppointment,
            authUser
        } = this.props;
        const {appointmentChanges} = this.state;

        const displayAppointmentData = {
            ...appointmentData,
            ...appointmentChanges,
        };

        const isNewAppointment = appointmentData.id === undefined;
        const applyChanges = isNewAppointment
            ? () => this.commitAppointment('added')
            : () => this.commitAppointment('changed');

        const textEditorProps = field => ({
            variant: 'outlined',
            onChange: ({ target }) => this.changeAppointment({ field: [field], changes: target.value }),
            value: displayAppointmentData[field] || '',
            label: field[0].toUpperCase() + field.slice(1),
            className: classes.textField,
        });

        const pickerEditorProps = field => ({
            className: classes.picker,
            ampm: false,
            value: displayAppointmentData[field],
            onChange: date => this.changeAppointment({
                field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
            }),
            inputVariant: 'outlined',
            format: 'DD/MM/YYYY HH:mm',
            onError: () => null,
        });

        const cancelChanges = () => {
            this.setState({
                appointmentChanges: {},
            });
            visibleChange();
            cancelAppointment();
        };

        const isAuthUserMeeting = displayAppointmentData.user === authUser;

        return (
            <AppointmentForm.Popup
                visible={visible}
                onBackdropClick={cancelChanges}
            >
                <AppointmentForm.Container className={classes.container}>
                    <Headline>{isNewAppointment ? 'Add' : 'Edit'} a meeting</Headline>
                    {!isAuthUserMeeting && !isNewAppointment && (
                        <Fade top>
                            <Warning>{OTHER_USER_MEETING}</Warning>
                        </Fade>
                    )}
                    <div className={classes.header}>
                        <IconButton
                            className={classes.closeButton}
                            onClick={cancelChanges}
                        >
                            <Close color="action" />
                        </IconButton>
                    </div>
                    <div className={classes.content}>
                        <div className={classes.wrapper}>
                            <Create className={classes.icon} color="action" />
                            <TextField
                                disabled={!isAuthUserMeeting && !isNewAppointment}
                                {...textEditorProps('title')}
                            />
                        </div>
                        <div className={classes.wrapper}>
                            <CalendarToday className={classes.icon} color="action" />
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDateTimePicker
                                    disabled={!isAuthUserMeeting && !isNewAppointment}
                                    label="Start Date"
                                    {...pickerEditorProps('startDate')}
                                />
                                <KeyboardDateTimePicker
                                    disabled={!isAuthUserMeeting && !isNewAppointment}
                                    label="End Date"
                                    {...pickerEditorProps('endDate')}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className={classes.wrapper}>
                            <Notes className={classes.icon} color="action" />
                            <TextField
                                disabled={!isAuthUserMeeting && !isNewAppointment}
                                {...textEditorProps('notes')}
                                multiline
                                rows="3"
                            />
                        </div>
                    </div>
                    <div className={classes.buttonGroup}>
                        {!isNewAppointment && isAuthUserMeeting && (
                            <Button
                                variant="outlined"
                                color="secondary"
                                className={classes.button}
                                onClick={() => {
                                    visibleChange();
                                    this.commitAppointment('deleted');
                                }}
                            >
                                Delete
                            </Button>
                        )}
                        {(isAuthUserMeeting || isNewAppointment) && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => {
                                        visibleChange();
                                        applyChanges();
                                    }}
                                >
                                    {isNewAppointment ? 'Create' : 'Save'}
                                </Button>
                            )
                        }
                    </div>
                </AppointmentForm.Container>
            </AppointmentForm.Popup>
        );
    }
}

const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(AppointmentFormContainerBasic);

export default AppointmentFormContainer;