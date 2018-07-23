import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Error from '../alerts/Error';
import InputField from './InputField';

class SignIn extends Component {
    handleFormSubmit({ email, password }) {
        this.props.signinUser({ email, password });
    }

    // TODO: Figure out Google Client Side Auth
    // handleGoogleSignin(e) {
    //     e.preventDefault();
    //     this.props.googleSigninUser();
    // }
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <Error errorMessage={this.props.errorMessage} />
            )
        }
    }
    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} 
                className="d-flex auth-form flex-column">
                <Field name="email" component={InputField} label="Email" type="email" placeholder="Email"/>
                <Field name="password" component={InputField} label="Password" type="password" placeholder="Password"/>
                { this.renderAlert() }
                <button type="submit">Sign In</button>
                <br />
                {/* Todo: Figure Out Google Client Side Auth
                <a href="http://localhost:3005/oauth/google"> Google </a>
                <button className="link" onClick={this.handleGoogleSignin.bind(this)}>   
                    Sign In With Google
                </button> */}
            </form>
        )
    }
}

// Higher Order Function to validate the form
const validate = values => {
    const errors = {};

    if (!values.email)
        errors.email = 'Please enter in an email address';
    else if (!/^.+@.+$/i.test(values.email))
        errors.email = 'Invalid email address';

    if (!values.password) 
        errors.password = 'Please enter in a password';

    return errors;
};

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password'],
    validate
})(connect(mapStateToProps, actions)(SignIn));