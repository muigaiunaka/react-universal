import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

class SignOut extends Component {
    componentWillMount() {
        this.props.signoutUser();
    }
    render() {
        return (
            <div>
                You just signed out! Hope to see you back soon.
            </div>
        )
    }
}

export default connect(null, actions)(SignOut);
