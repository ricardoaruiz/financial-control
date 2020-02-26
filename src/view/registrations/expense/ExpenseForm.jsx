import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';

import Button from '../../../component/button';
import Form, { ControlSelect, ControlText, FormField } from '../../../component/form';
import { Content } from '../../../component/layout';
import { SpinnerService } from '../../../component/spinner';
import { ToastService } from '../../../component/toast';
import ExpenseService from '../../../shared/service/ExpenseService';
import styles from './ExpenseForm.module.scss';

// TODO criar arquivo com validações genéricas
const required = value => (value || typeof value === 'number' ? undefined : 'Campo obrigatório')

const INITIAL_STATE = {
    name: '',
    description: '',
    active: ''
}

const YES_NO_VALUES = [
    {value: '', label: ''},
    {value: true, label: 'Sim'},
    {value: false, label: 'Não'}
];

const ExpenseForm = (props) => {

    const { history } = props;
    const { id } = useParams();
    const [data, setData] = useState(INITIAL_STATE);

    useEffect(() => {
        setData(INITIAL_STATE);
        if (id) {
            SpinnerService.on();
            ExpenseService.load(id)
                .then(expense => setData(expense))
                .catch(() => ToastService.error({title:'Informação', message:'Problema ao carregar o tipo de despesa. Tente novamente.'}))
                .finally(() => SpinnerService.off())
        }
    }, [id])

    const confirmForm = values => {
        SpinnerService.on();
        if (!id) {
            ExpenseService.add(values)
                .then(() => {
                    ToastService.success({title:'Informação', message:'Tipo de despesa criada com sucesso'});
                    backToList()
                })
                .catch(() => {
                    ToastService.error({title:'Informação', message:'Problema ao criar um tipo de despesa. Tente novamente.'});
                    SpinnerService.off();
                })
        } else {
            ExpenseService.update(id, values)
                .then(() => {
                    ToastService.success({title:'Informação', message:'Tipo de despesa alterada com sucesso'});
                    backToList()
                })
                .catch(() => {
                    ToastService.error({title:'Informação', message:'Problema ao alterar um tipo de despesa. Tente novamente.'});
                    SpinnerService.off();
                });
        }
    }

    const backToList = () => {
        history.push('/registration/expense');
    }

    const customButtons = () => (
        <Button 
            type="button" 
            label="Voltar"
            onClick={backToList}
            primary="true"
        />
    ); 

    return (
        <Content image="dollar" title="Tipos de Despesas" subtitle="Cadastro - Novo">            
            <div className={styles.ExpenseForm}>
                <Form 
                    initialData={data} 
                    onSubmit={confirmForm}
                    renderCustomButtons={customButtons}
                    confirmButtonLabel="Salvar"
                >
                    <div className={styles.ExpenseFields}>
                        <FormField
                            name="name" 
                            label="Nome" 
                            component={ControlText} 
                            validators={[required]}
                        />
                        <FormField
                            name="description" 
                            label="Descrição" 
                            component={ControlText} 
                            validators={[required]}
                        />
                        <FormField
                            name="active" 
                            label="Ativo" 
                            component={ControlSelect} 
                            values={YES_NO_VALUES}
                            validators={[required]}
                        />    
                    </div>
                </Form>
            </div>
        </Content>
    );
}

ExpenseForm.displayName = 'ExpenseForm';

ExpenseForm.propTypes = {
    history: PropTypes.object.isRequired
}

export default withRouter(ExpenseForm);