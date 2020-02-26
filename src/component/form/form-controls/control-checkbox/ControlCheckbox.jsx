import PropTypes from 'prop-types';
import React from 'react';

const ControlCheckbox = ({
    input, 
    label,
    type,
    className
}) => {
    return (
        <div className="control-text-group">
            {/* Label */}
            <label htmlFor={input.name}>{label}</label>

            <input 
                type={type} 
                {...input} 
                className={`control-checkbox ${className ? className : ''}`} 
            />
        </div>
    );
}

ControlCheckbox.displayName = 'ControlCheckbox';
ControlCheckbox.type = 'checkbox';

ControlCheckbox.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    meta: PropTypes.object
}
 
export default ControlCheckbox;