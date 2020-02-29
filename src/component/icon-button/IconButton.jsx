import PropTypes from 'prop-types';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './IconButton.module.scss';

const IconButton = props => {

    const { icon, tooltip, onClick } = props;

    return (
        <button className={styles.BtnIcon} onClick={onClick} title={tooltip} {...props} >
            <FontAwesomeIcon icon={icon} />
        </button>
    );
}
 
IconButton.propTypes = {
    icon: PropTypes.oneOfType(PropTypes.string, PropTypes.array).isRequired,
    tooltip: PropTypes.string,
    onClick: PropTypes.func
}

export default IconButton;