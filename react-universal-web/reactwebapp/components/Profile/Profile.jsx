import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import './Profile.scss';

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
            <section>
                <h1>Welcome to your Profile</h1>
                <strong>Email</strong> { this.fetchUsers() }
            </section>
        )
    }
}

function mapStateToProps(state) {
    return { user: state.auth.user };
}

export default connect(mapStateToProps, actions)(Profile);