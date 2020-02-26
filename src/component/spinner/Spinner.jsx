import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styles from './Spinner.module.scss';
import SpinnerService, { GLOBAL_SPINNER } from './SpinnerService';

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
            <i className="fa fa-spinner fa-pulse fa-3x" />
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