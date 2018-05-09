import React from 'react';
import { Route } from 'react-router';
import Header from '../Header';

const AuthLayout = ({component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <div>
                <Header />
                <Component {...matchProps} />
            </div>
        )} />
    )
}

export default AuthLayout;