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
        const InputField = ({ placeholder, input, label, type, meta: { touched, error, warning }, }) =>
        <fieldset>
            <label>{label}</label>
            <input {...input} type={type} placeholder={placeholder}/>
            {touched && error && <Error errorMessage={error} />}
        </fieldset>
            ;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} 
                className="d-flex auth-form flex-column">
                <Field name="email" component={InputField} label="Email" type="email" placeholder="Email"/>
                <Field name="password" component={InputField} label="Password" type="password" placeholder="Password"/>
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