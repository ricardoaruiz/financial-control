import './ControlText.scss';

import PropTypes from 'prop-types';
import React from 'react';

import FormControlMessage from '../control-message/FormControlMessage';

const ControlText = ({
    input, 
    label,
    type,
    className,
    meta: { touched, error, warning }
}) => {
    return (
        <div className="control-text-group">
            {/* Label */}
            <label htmlFor={input.name}>{label}</label>
            
            {/* Input element */}
            <input 
                type={type} 
                {...input} 
                className={`control-text ${className ? className : ''}`} 
            />

            <FormControlMessage touched={touched} error={error} warning={warning} />
        </div>
    )
};

ControlText.displayName = 'ControlText';
ControlText.type = 'text';

ControlText.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    meta: PropTypes.object
}

export default ControlText;