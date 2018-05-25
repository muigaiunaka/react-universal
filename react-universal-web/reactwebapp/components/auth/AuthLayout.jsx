import React from 'react';
import { Route } from 'react-router';
import Header from '../Header/Header';

const AuthLayout = ({component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <main>
                <Header />
                <Component {...matchProps} />
            </main>
        )} />
    )
}

export default AuthLayout;