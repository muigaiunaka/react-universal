import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/react.svg';
import './Landing.scss';

const Landing = () => (
    <section className="d-flex justify-content-center align-items-center flex-column">
        <h1>Hello from the Landing screen</h1>
        <Logo className="logo default"/>
        <button className="default dark">
            <Link
                to="/signin"
            >
                Come Log in
            </Link>
        </button>
    </section>
)

export default Landing;