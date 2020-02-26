import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { propTypes, reduxForm } from 'redux-form';

import Button from '../button/Button';
import styles from './Form.module.scss';

const FORM = 'generic-form';

const Form = props => {

    const { 
        initialData, 
        children, 
        handleSubmit, 
        reset, 
        initialize, 
        pristine, 
        submitting, 
        onSubmit,
        confirmButtonLabel,
        cleanButtonLabel,
        renderCustomButtons,
    } = props;

    useEffect(() => {
        initialize(initialData);
    }, [initialize, initialData])

    const submitForm = values => {

        // Received by caller
        onSubmit(values);

        // TODO verificar como limpar somente em caso de sucesso
        // clearForm();
    }

    const clearForm = () => {
        // Reset from redux-form
        reset(FORM);
    }

    return (
        <form className={styles.Form}>
            <div className={styles.Fields}>
                {children}
            </div>

            <div className={styles.Actions}>
                <Button
                    type="button" 
                    label={confirmButtonLabel ? confirmButtonLabel : 'Confirmar'}
                    onClick={handleSubmit(submitForm.bind(this))}
                    primary="true"
                    />
                <Button
                    type="button" 
                    label={cleanButtonLabel ? cleanButtonLabel : 'Limpar'}
                    disabled={pristine || submitting}     
                    onClick={clearForm}
                    className="default"
                    />
                {renderCustomButtons ? renderCustomButtons() : null}
            </div>
        </form>
    );
}

Form.displayName = 'Form';

Form.propTypes = {
    ...propTypes,
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    handleSubmit: PropTypes.func,
    reset: PropTypes.func,
    initialize: PropTypes.func,
    onSubmit: PropTypes.func,
    onSearch: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    confirmButtonLabel: PropTypes.string,
    cleanButtonLabel: PropTypes.string,
    formData: PropTypes.object,
    renderCustomButtons: PropTypes.func,
}
 
const mapStateToProps = state => ({ formData: state.form[FORM]});
const ConnectedForm = connect(mapStateToProps)(Form);

export default reduxForm({form: FORM})(ConnectedForm);