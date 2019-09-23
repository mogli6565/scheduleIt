import React from 'react';
import {Router, Route} from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary'
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import AuthRoute from './components/AuthRoute'
import {history} from './helpers/history'

function App() {
 return (
    <ErrorBoundary>
        <Router history={history}>
            <div>
                <AuthRoute exact path="/" component={Dashboard} />
                <Route path="/login" component={Login} />
            </div>
        </Router>
    </ErrorBoundary>
  )
};

export default App;