import React from 'react';
import { Route } from 'react-router';

/* 
AuthLayout: stateless Higher Order Function for handling Authentication
*/
const AuthLayout = ({component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <Component {...matchProps} />
        )} />
    )
}

export default AuthLayout;