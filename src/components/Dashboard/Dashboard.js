import React, {useState, lazy, Suspense} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components';
import {Card, Greeting, Logout} from "../../style/sharedStyle";
import {getGreetingMessage} from '../../helpers/utils'
import * as actions from "../../reducers/actions";
import {userService} from "../../services/userSevice";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {rooms} from '../../constants/translations';
import Loader from '../Loader';

const LazySchedulerBoard = lazy(() => import("./SchedulerBoard"));

const Root = styled.div``;

const StyledCard = styled(Card)`
  flex-direction: column;
`;

const StyledTabs = styled(Tabs)`
  height: 30px;
  margin: 0 auto;
`;

const Dashboard = ({history}) => {
    const [room, setRoom] = useState(0);
    const dispatch = useDispatch();
    let authUser = useSelector(state => state.authUser);
    const authUserLocalStorage = JSON.parse(localStorage.getItem('authUser'));
    // try to get the user from the store or localStorage as a fallback
    if (!authUser && authUserLocalStorage) {
        authUser = authUserLocalStorage;
        dispatch({ type: actions.USER_LOGGED_IN , payload: authUserLocalStorage});
    }

    //logout action
    const handleLogout = () => {
        userService.logout();
        dispatch({type: actions.USER_LOGGED_OUT});
        history.push('/login');
    };

    return (
        <Root>
            <StyledCard width='90%' height='78vh' className='dashboardCard'>
                <Greeting>{getGreetingMessage()} {authUser.firstName} :)</Greeting>
                <Logout onClick={() => handleLogout()}>Logout</Logout>
                <StyledTabs
                    value={room}
                    onChange={(e, newValue) => setRoom(newValue)}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {rooms.map((name, i) => (
                        <Tab label={`Room ${name}`} key={i} onClick={() => setRoom(i)}/>
                    ))}
                </StyledTabs>
                <Suspense fallback={<Loader/>}>
                    <LazySchedulerBoard key={room} room={rooms[room]} />
                </Suspense>
            </StyledCard>
        </Root>
    )
};

export default Dashboard;