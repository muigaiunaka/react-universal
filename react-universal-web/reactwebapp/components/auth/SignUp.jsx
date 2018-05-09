import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../redux/actions';
import Error from '../alerts/Error';

class SignUp extends Component {
    handleFormSubmit(formProps) {
        // call action creator to sign up the user
        // NOTE: handleSubmit knows to make use of validate below
        this.props.signupUser(formProps);
    }
    
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <Error errorMessage={this.props.errorMessage} />
            )
        }
    }

    render() {
        const { handleSubmit } = this.props;
        const InputField = ({ input, label, type, meta: { touched, error, warning }, }) =>
            <div>
                <label>{label}</label>
                <input {...input} type={type} />
                {touched && error && <Error errorMessage={error} />}
            </div>;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset>
                    <Field name="email" component={InputField} label="Email" type="email" />
                </fieldset>
                <fieldset>
                    <Field name="password" component={InputField} label="Password" type="password" />
                    {<div>{this.props.password}</div>}
                </fieldset>
                <fieldset>
                    <Field name="passwordConfirm" component={InputField} label="Confirm Password" type="password" />
                </fieldset>
                { this.renderAlert() }
                <button type="submit">Sign Up</button>
            </form>
        );
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
    
    if (!values.passwordConfirm) 
        errors.passwordConfirm = 'Please enter password confirmation';

    if (values.password !== values.passwordConfirm)
        errors.password = 'Passwords must match';

    return errors;
};

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
})(connect(mapStateToProps, actions)(SignUp));