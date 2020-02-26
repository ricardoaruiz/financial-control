import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'redux-form';

const FormField = props => {

    const { name, label, component, validators } = props;

    return (
        <Field 
            name={name} 
            label={label}
            component={component} 
            type={component.type}
            validate={ validators ? [...validators] : [] }
            {...props}
        />
    );
}
 
FormField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    component: PropTypes.func,
    validators: PropTypes.arrayOf(PropTypes.func)
}

export default FormField;