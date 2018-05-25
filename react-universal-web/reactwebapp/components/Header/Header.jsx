import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { nav , main } from './Header.scss';
import './Header.scss';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return [
                <NavLink exact to="/profile" activeClassName="selected" key={1}>Profile</NavLink>,
                <NavLink exact to="/signout" activeClassName="selected" key={2}>Sign Out</NavLink>,
            ]
        } else {
            return [
                <NavLink exact to="/signin" activeClassName="selected" key={1}>Sign In</NavLink>,
                <NavLink exact to="/signup" activeClassName="selected" key={2}>Sign Up</NavLink>
            ]
        }
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