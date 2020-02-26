import PropTypes from 'prop-types';
import React from 'react';

import styles from './IconButton.module.scss';

const IconButton = props => {

    const { icon, tooltip, onClick } = props;

    return (
        <button className={styles.BtnIcon} onClick={onClick} title={tooltip}>
            <i className={`fa fa-${icon}`}></i>
        </button>
    );
}
 
IconButton.propTypes = {
    icon: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    onClick: PropTypes.func
}

export default IconButton;