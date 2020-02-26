import PropTypes from 'prop-types';
import React, { useEffect, useState, memo } from 'react';
import styles from './ConfirmDialog.module.scss'
import Button from '../button'
import ConfirmDialogService from './ConfirmDialogService';

const Dialog = (props) => {
    const { 
        id,
        title, 
        message, 
        btnOkLabel, 
        btnCancelLabel,
        onConfirm,
        onCancel
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const token = ConfirmDialogService.dialog.subscribe(id, (obj, data) => {
            console.log('spinner', obj, data)
            if (obj === id)
                setIsOpen(data);
        })

        return () => {
            ConfirmDialogService.dialog.unsubscribe(token);
        }
    }, [id])

    const confirm = () => {
        onConfirm();
        close();
    }

    const cancel = () => {
        onCancel();
        close();
    }

    const close = () => {
        setIsOpen(false);
    }
    
    return (
        <div className={`${styles.DialogOverlay} ${isOpen ? styles.opened : styles.closed}`}>
            <div className={styles.Dialog}>

                <div className={styles.DialogHeader}>
                    <p>{title}</p>
                </div>

                <div className={styles.DialogMessage}>
                    <p>{message}</p>
                </div>

                <div className={styles.DialogButtons}>
                    <Button label={btnOkLabel} primary="true" onClick={confirm} />
                    <Button label={btnCancelLabel} onClick={cancel} />
                </div>

            </div>
        </div>
    );
}

Dialog.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    btnOkLabel: PropTypes.string, 
    btnCancelLabel: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
}

Dialog.defaultProps = {
    btnOkLabel: 'Confirmar',
    btnCancelLabel: 'Cancelar',
}
 
export default memo(Dialog);