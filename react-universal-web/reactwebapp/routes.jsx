import React from 'react';
import Landing from './components/Landing/Landing';
import Profile from './components/Profile/Profile';
import Admin from './components/Admin/Admin';
import AuthLayout from './components/Auth/AuthLayout';
import RequireAuth from './components/Auth/RequireAuth';
import SignIn from './components/Auth/SignIn';
import SignOut from './components/Auth/SignOut';
import SignUp from './components/Auth/SignUp';
import SplitLayout from './components/SplitLayout/SplitLayout';

const Routes = () => (
    <div>
        <AuthLayout exact path="/" component={SplitLayout(Landing)}/>
        <AuthLayout path="/signin" component={SplitLayout(SignIn)}/>
        <AuthLayout path="/signout" component={SplitLayout(SignOut)}/>
        <AuthLayout path="/signup" component={SplitLayout(SignUp)}/>
        {/* RequireAuth: Higher Order Component requiring user to be authenticated (aka signed in) */}
        <AuthLayout path="/profile" component={RequireAuth(SplitLayout(Profile))}/>
        <AuthLayout path="/admin" component={RequireAuth(Admin)}/>
    </div>
)

export default Routes;