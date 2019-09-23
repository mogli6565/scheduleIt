import React, {useState} from 'react';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import loginPic from '../../assets/login.jpg';
import {LOGIN_STEP} from "../../constants/translations";
import LoginView from "./LoginView";
import RegisterView from "./RegisterView";
import {Card} from "../../style/sharedStyle";

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Img = styled.img`
  height: 100%;
  width: 65%;
  filter: saturate(1.5);
`;

const StyledTabs = styled(Tabs)`
  height: 40px;
  font-size: 18px;
`;

const Login = ({history}) => {
    const [step, setStep] = useState(LOGIN_STEP);
    //indicates if the user is after a successful registration
    const [registerSuccess, setRegisterSuccess] = useState({});
    return (
        <Card className='loginCard' width='75%' height='70vh'>
            <Img className='loginImg' src={loginPic} />
            <RightSide>
                <StyledTabs
                    value={step}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, newValue) => setStep(newValue)}
                >
                    <Tab label="Login" />
                    <Tab label="Register" />
                </StyledTabs>

                {step === LOGIN_STEP ?
                    <LoginView {...{history, setStep, registerSuccess}}/> :
                    <RegisterView {...{setStep, setRegisterSuccess}} />
                }
            </RightSide>
        </Card>
    )
};

export default Login;