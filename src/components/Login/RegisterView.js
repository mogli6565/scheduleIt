import React, {useState} from 'react';
import styled from 'styled-components';
import {userService} from "../../services/userSevice";
import TextField from '@material-ui/core/TextField';
import {loginViewMaterialStyles} from './materialStyles'
import Button from "@material-ui/core/Button/Button";
import {LOGIN_STEP, EMPTY_FIELD, REGISTER_SUCCESS_MSG} from "../../constants/translations";
import SuccessLine from "./SuccessLine";
import ErrorLine from "./ErrorLine";

const RegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const RegisterView = ({setStep ,setRegisterSuccess}) => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const classes = loginViewMaterialStyles();
    let usernameInput, passwordInput, nameInput, lastNameInput;

    // handle register user event
    const handleRegister = () => {
        setError(false);
        const username = usernameInput.value;
        const password = passwordInput.value;
        const firstName = nameInput.value;
        if (!username || !password || !firstName){
            setError(EMPTY_FIELD);
            return;
        }
        const userObject = {username, password, firstName, lastName: lastNameInput.value}
        const {success, error} = userService.register(userObject);
        if(success){
            setSuccess(REGISTER_SUCCESS_MSG);
            // to simulate a async call and show success message
            setTimeout(() => {
                setRegisterSuccess({username, password});
                setStep(LOGIN_STEP);
            }, 1000)
        } else{
            setError(error);
        }
    };

    return (
        <RegisterForm>
            <TextField error={error} inputRef={input => (nameInput = input)} required
                       label="First Name" className={classes.input} />
            <TextField inputRef={input => (lastNameInput = input)}
                       label="Last Name" className={classes.input} />
            <TextField error={error} inputRef={input => (usernameInput = input)} required
                       label="Username" className={classes.input} />
            <TextField error={error} inputRef={input => (passwordInput = input)} required
                       label="Password" type="password" className={classes.input} />
            <Button className={classes.button} onClick={() => handleRegister()}>Register</Button>
            {success && <SuccessLine {...{success}}/>}
            {error && <ErrorLine {...{error}} />}
        </RegisterForm>
    )
};

export default RegisterView;