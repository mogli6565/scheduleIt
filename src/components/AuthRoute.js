import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// renders the dashboard/login page depends if the user is logged in
const AuthRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        localStorage.getItem('authUser')
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
    )} />
);

export default AuthRoute;