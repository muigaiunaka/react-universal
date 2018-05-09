import React from 'react';

const Error = props => {

    return (
        <div className="alert error">
        {/* TODO: include error icon in the future */}
            {`${props.errorMessage}`}
        </div>
    )
}

export default Error;