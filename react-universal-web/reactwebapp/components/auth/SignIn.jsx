import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import Error from '../alerts/Error';

class SignIn extends Component {
    handleFormSubmit({ email, password }) {
        this.props.signinUser({ email, password });
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
                    <Field name="email" component={InputField} label="Email" type="email" placeholder="neji@gmail.com"/>
                </fieldset>
                <fieldset>
                    <Field name="password" component={InputField} label="Password" type="password" />
                </fieldset>
                { this.renderAlert() }
                <button type="submit">Sign In</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
})(connect(mapStateToProps, actions)(SignIn));