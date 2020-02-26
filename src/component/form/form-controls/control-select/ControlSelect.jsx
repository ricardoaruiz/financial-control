import PropTypes from 'prop-types';
import React from 'react';

import FormControlMessage from '../control-message/FormControlMessage';
import styles from './ControlSelect.module.scss';

const ControlSelect = ({ 
    input,
    label,
    className,
    values,
    meta: { touched, error, warning },
}) => {
    return (
        <div className={styles.ControlSelectContainer}>
            <label htmlFor={input.name}>{label}</label>

            <select 
                {...input}
                className={`${styles.ControlSelect} ${className ? className : ''}`}
            >
                { values.map(item => <option key={item.value} value={item.value}>{item.label}</option>) }
            </select>

            <FormControlMessage touched={touched} error={error} warning={warning} />
        </div>
    );
}

ControlSelect.displayName = 'ControlSelect';
ControlSelect.type = 'select';
 
ControlSelect.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.object).isRequired,
    meta: PropTypes.object,
}

export default ControlSelect;