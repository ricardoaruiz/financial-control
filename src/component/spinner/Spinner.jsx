import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styles from './Spinner.module.scss';
import SpinnerService, { GLOBAL_SPINNER } from './SpinnerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Spinner = (props) => {

    const { id } = props;
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const token = SpinnerService.spinner.subscribe(id, (obj, data) => {
            if (obj === id)  
                setIsShow(data);
        })

        return () => {
            SpinnerService.spinner.unsubscribe(token);
        }
    }, [id]);

    return (
        <div className={`${styles.SpinnerOverlay} ${isShow ? styles.show : styles.hide}`}>
            <span><FontAwesomeIcon icon={['fas', 'spinner']} pulse size="2x" /></span>
            <p>Carregando...</p>
        </div>
    );
}
 
Spinner.propTypes = {
    id: PropTypes.string.isRequired
}

Spinner.defaultProps = {
    id: GLOBAL_SPINNER
}

export default Spinner;