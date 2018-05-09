import React from 'react';
import App from './components/App';
import Profile from './components/profile';
import AuthLayout from './components/auth/AuthLayout';
import RequireAuth from './components/auth/RequireAuth';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import SignUp from './components/auth/SignUp';

const Routes = () => (
    <div>
        <AuthLayout exact path="/" component={App}/>
        <AuthLayout path="/signin" component={SignIn}/>
        <AuthLayout path="/signout" component={SignOut}/>
        <AuthLayout path="/signup" component={SignUp}/>
        <AuthLayout path="/profile" component={RequireAuth(Profile)}/>
    </div>
)

export default Routes;