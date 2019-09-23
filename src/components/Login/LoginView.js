import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import {userService} from "../../services/userSevice";
import Button from '@material-ui/core/Button';
import {loginViewMaterialStyles} from './materialStyles'
import {REGISTER_STEP, EMPTY_FIELD, LOGIN_SUCCESS_MSG} from "../../constants/translations";
import * as actions from '../../reducers/actions';
import ErrorLine from './ErrorLine';
import SuccessLine from './SuccessLine'

const Root = styled.div``;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const Headline = styled.div`
  font-size: 40px;
  margin-left: 20px;
  margin-top: 10px;
  color: darkslategray;
  font-family: 'Mansalva', cursive;
`;

const ToRegister = styled.span`
  margin-top: 30px;
  font-size: 12px;
  margin-left: 20px;
  display: inline-flex;
`;

const Redirect = styled.span`
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
  width: auto;
  display: inline-flex;
  margin-left: 5px;
`;

const LoginView = ({setStep, history, registerSuccess}) => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const classes = loginViewMaterialStyles();
    let usernameInput, passwordInput;

    // login attempt event
    const handleLogin = () => {
        setError(false);
        const user = usernameInput.value;
        const pass = passwordInput.value;
        if(!user || !pass){
            setError(EMPTY_FIELD);
            return;
        }

        const {success, error, authUser} = userService.login(user, pass);
        if(success){
            setSuccess(LOGIN_SUCCESS_MSG);
            // to simulate a async call and show success message
            setTimeout(() => {
                dispatch({ type: actions.USER_LOGGED_IN , payload: authUser});
                history.push('/');
            }, 1000)
        } else {
            setError(error);
        }
    };

    return (
        <Root>
            <Headline>Hey buddy :)</Headline>
            <LoginForm>
                <TextField
                    className={classes.input}
                    label="Type username"
                    required
                    inputRef={input => (usernameInput = input)}
                    error={!!error}
                    value={registerSuccess.username || usernameInput}
                />
                <TextField
                    className={classes.input}
                    required
                    label="Type password"
                    type="password"
                    inputRef={input => (passwordInput = input)}
                    error={!!error}
                    value={registerSuccess.password || passwordInput}
                />
                <Button className={classes.button} onClick={() => handleLogin()}>Login</Button>
                {success && <SuccessLine {...{success}}/>}
                {error && <ErrorLine {...{error}} />}
            </LoginForm>
            <ToRegister>
                <div>Don't have a username yet?</div>
                <Redirect onClick={() => setStep(REGISTER_STEP)}>Register Now!</Redirect>
            </ToRegister>
        </Root>
    )
};

export default LoginView;