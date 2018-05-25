import React from 'react';
import Landing from './components/Landing/Landing';
import Profile from './components/Profile/Profile';
import AuthLayout from './components/Auth/AuthLayout';
import RequireAuth from './components/Auth/RequireAuth';
import SignIn from './components/Auth/SignIn';
import SignOut from './components/Auth/SignOut';
import SignUp from './components/Auth/SignUp';

const Routes = () => (
    <div>
        <AuthLayout exact path="/" component={Landing}/>
        <AuthLayout path="/signin" component={SignIn}/>
        <AuthLayout path="/signout" component={SignOut}/>
        <AuthLayout path="/signup" component={SignUp}/>
        <AuthLayout path="/profile" component={RequireAuth(Profile)}/>
    </div>
)

export default Routes;