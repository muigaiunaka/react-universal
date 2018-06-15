import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions';
import './Profile.scss';

class Profile extends Component {
    state = {
        email: 'null'
    }
    deleteUser = this.deleteUser.bind(this)

    isAdmin() {
        if (this.props.role)
            return this.props.role.role == 'ADMIN' || this.props.role.isAdmin
    }

    fetchUsers() {
        if (this.props.user) {
            return (
                <div>
                    {this.props.user.email}
                </div>
            )
        }
    }

    deleteUser() {
        var confirmDeleteUser = confirm('Please confirm that you want to delete this user account. This cannot be undone.')
        if (confirmDeleteUser) {
            this.props.deleteUser()
        } else {
            // do nothing
        }
    }

    componentWillMount() {
        this.props.fetchUser()
        this.props.isAdmin()
    }

    render() {
        const adminButton = <button className="link primary">
        <Link
            to="/admin"
        >
            Admin Panel
        </Link>
    </button>
        return (
            <section>
                <h1>Welcome to your Profile</h1>
                <strong>Email</strong> { this.fetchUsers() }
                { this.isAdmin() ? adminButton : null }
                <button onClick={this.deleteUser}>Delete Account</button>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return { user: state.auth.user, role: state.auth.role };
}

export default connect(mapStateToProps, actions)(Profile);