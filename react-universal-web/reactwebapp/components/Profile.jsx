import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

class Profile extends Component {
    state = {
        email: 'null'
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

    componentWillMount() {
        this.props.fetchUser()
    }

    render() {
        return (
            <div>
                <h1>Welcome to your Profile</h1>
                <strong>Email</strong> { this.fetchUsers() }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { user: state.auth.user };
}

export default connect(mapStateToProps, actions)(Profile);