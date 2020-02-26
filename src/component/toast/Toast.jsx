import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import styles from './Toast.module.scss';
import ToastService, { GLOBAL_TOAST, TOAST_TYPE } from './ToastService';

const Toast = (props) => {

    const { id, autoClose } = props;
    const [isShow, setIsShow] = useState(false);
    const [values, setValues] = useState(undefined);

    useEffect(() => {
        const token = ToastService.toast.subscribe(id, (obj, values) => {
            if (id === obj)
                setValues(values);

                setTimeout(() => {
                    setIsShow(true);
                    setTimeout(() => {
                        setIsShow(false);
                    }, autoClose);                    
                }, 500);

        });

        return () => {
            ToastService.toast.unsubscribe(token);
        }
    }, [id, autoClose]);

    const toastType = (type) => {
        switch (type) {
            case TOAST_TYPE.SUCCESS:
                return styles.success;
            case TOAST_TYPE.ERROR:
                return styles.error;
            case TOAST_TYPE.WARN:
                return styles.warn;
            default:
                return styles.success;
        }
    }

    const toastTitle = (title) => {
        return !title 
            ? '' 
            : (
                <div className={styles.title}>
                    {title}
                </div>
            );
    }

    const toast = () => {
        return !values 
            ? null 
            :  <div className={styles.Toasts}>
                    {values.toasts.map(t => {
                        return (                        
                            <div key={t.message} 
                                className={`${ styles.Toast } ${ isShow ? styles.show : styles.hide } ${toastType(values.type)}`}
                            >
                                {toastTitle(t.title)}

                                <div className={styles.message}>
                                    {t.message}
                                </div>
                            </div>
                        )
                    })}
                </div>;
    }

    return toast();
}
 
Toast.propTypes = {
    id: PropTypes.string.isRequired,
    autoClose: PropTypes.number
}

Toast.defaultProps = {
    id: GLOBAL_TOAST,
    autoClose: 4000,
}

export default Toast;