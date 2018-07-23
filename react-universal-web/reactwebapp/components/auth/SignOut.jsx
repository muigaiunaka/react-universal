import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

class SignOut extends Component {
    componentWillMount() {
        this.props.signoutUser();
    }
    render() {
        return (
            <section>
                <h2>Ciao, for now</h2>
                <h4>We have signed you out successfully! We hope to see you back soon.</h4>
            </section>
        )
    }
}

export default connect(null, actions)(SignOut);
