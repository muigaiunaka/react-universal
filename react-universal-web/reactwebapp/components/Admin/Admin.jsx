import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

class Admin extends Component {
    state = {
        email: 'null',
        role: 'null',
        users: [],
    }

    isAdmin() {
        if (this.props.role)
            return this.props.role.role == 'ADMIN' || this.props.role.isAdmin
    }

    fetchUsers() {
        if (this.props.users) {
            let users = this.props.users
            
            return ( 
                users.map( (user, i) => {
                    return (
                        <section key={i} className="table">
                            <span>{user.role ? user.role : 'No Role Assigned'}</span>
                            <span>{user.email ? user.email : 'No Email Added'}</span>
                            <span>{user.phone ? user.phone : 'No Phone Added'}</span>
                            <button title="Edit the users account information">Edit User</button>
                            <button title="Delete the user account information">Delete User</button>
                        </section>
                    )
                })
            )
        }
    }

    componentWillMount() {
        this.props.isAdmin()
        this.props.fetchUsers();
    }

    render() {
        
        if (this.isAdmin()) {
            return (
                <section>
                    <h1>Welcome to Admin Panel</h1>
                    { this.isAdmin() ? <div>Admin</div> : null }
                    <h2>Users</h2>
                    { this.fetchUsers() }
                </section>
            )
        } else {
            return (
                <section>
                    <p>You are not authorized to be on this page</p>
                </section>
            )
        }
    }
}

function mapStateToProps(state) {
    return { user: state.auth.user, role: state.auth.role, users: state.auth.users };
}

export default connect(mapStateToProps, actions)(Admin);