import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { nav , main } from './Header.scss';
import './Header.scss';

class Header extends Component {
    renderLinks() {
        return [
            <NavLink exact to={this.props.authenticated ? "/profile" : "/signin"} 
            activeClassName="selected" key={1}>{this.props.authenticated ? "Profile" : "Sign In"}</NavLink>,
            <NavLink exact to={this.props.authenticated ? "/signout" : "/signup"} 
            activeClassName="selected" key={2}>{this.props.authenticated ? "Sign Out" : "Sign Up"}</NavLink>,
        ]
    }
    render() {
        return (
            
            <nav className='main'>
                <NavLink
                    exact
                    to="/"
                    activeClassName="selected"
                >Home</NavLink>
                { this.renderLinks() }
            </nav>
        )
    }
}
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
    };
}
export default connect(mapStateToProps)(Header);