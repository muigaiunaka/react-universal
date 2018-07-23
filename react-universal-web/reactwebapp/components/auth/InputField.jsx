import React from 'react';
import Error from '../alerts/Error';

// Stateless Functional Component to handle initial loss of focus onChange bug in redux-form
const InputField = ({ placeholder, input, label, type, meta: { touched, error, warning }, }) => {

    return (
        <fieldset>
            <label>{label}</label>
            <input {...input} type={type} placeholder={placeholder}/>
            {touched && error && <Error errorMessage={error} />}
        </fieldset>
    )
}

export default InputField;