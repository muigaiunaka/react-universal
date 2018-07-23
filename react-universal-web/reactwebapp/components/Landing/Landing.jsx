import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../../assets/images/react.svg';
import './Landing.scss';

class Landing extends Component {

    renderButtons() {
        return (
            <button className="default dark">
                <Link
                    to={this.props.authenticated ? "/profile" : "/signin"}
                >
                    {this.props.authenticated ? "Go To Profile" : "Go Sign In" }
                </Link>
            </button>
        )
    }
    render() {
        return (
            <section className="d-flex justify-content-center align-items-center flex-column">
                <h1>Welcome to 
                    <em>{' '}React Universal</em>
                </h1>
                <Logo className="logo default"/>
                { this.renderButtons() }
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
    };
}
export default connect(mapStateToProps)(Landing);