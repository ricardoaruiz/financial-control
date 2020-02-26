import './FormControlMessage.scss'

import PropTypes from 'prop-types';
import React from 'react';

const FormControlMessage = props => {

    const { touched, error, warning } = props;

    if (touched) {
        if (error) {
            return (error && <small className="input-error">{error}</small>);
        }
        if (warning) {
            return (warning && <small className="input-warning">{warning}</small>);
        }
        return null;
    }
    return null;
}

FormControlMessage.propTypes = {
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
}
 
export default FormControlMessage;