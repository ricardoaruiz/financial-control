import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import Button from '../../../component/button';
import Dialog, { ConfirmDialogService } from '../../../component/confirm-dialog';
import Form, { ControlSelect, ControlText, FormField } from '../../../component/form';
import IconButton from '../../../component/icon-button/IconButton';
import { Content } from '../../../component/layout';
import { SpinnerService } from '../../../component/spinner';
import Table from '../../../component/table/Table';
import TableColumn from '../../../component/table/TableColumn';
import { ToastService } from '../../../component/toast';
import ExpenseService from '../../../shared/service/ExpenseService';
import styles from './Expense.module.scss';

const INITIAL_EXPENSE_FILTER = {
    id: undefined,
    name: '',
    description: '',
    active: true,
    currentPage: 1,
    regsPerPage: 10,
}

const YES_NO_VALUES = [
    {value: '', label: ''},
    {value: true, label: 'Sim'},
    {value: false, label: 'Não'}
];

const idConfirmationRemoveExpense = "expense-type-remove-dialog";

const Expense = (props) => {

    const { history } = props;
    const [filter, setFilter] = useState(INITIAL_EXPENSE_FILTER)
    const [expenses, setExpenses] = useState([]);
    const [expenseToRemove, setExpenseToRemove] = useState(INITIAL_EXPENSE_FILTER);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        find(filter);
    }, [filter])

    const confirmSearch = values => {
        const newFilter = { ...filter, ...values }
        console.log('values', values, 'newFilter', newFilter)
        setFilter(newFilter);
    }

    const find = filter => {
        SpinnerService.on();

        ExpenseService.search(filter)
            .then(result => {
                setTotalPages(result.pagination.totalPages);                                
                setExpenses(result.data)
            } )
            .catch(() => ToastService.error({title:'Informação', message:'Erro ao listar os tipo de despesa. Tente novamente.'}))
            .finally(() => SpinnerService.off());
    }

    const newExpense = () => {
        history.push('/registration/create-expense');
    };

    const edit = (expense) => {
        history.push(`/registration/edit-expense/${expense.id}`);
    };

    const openRemoveExpenseConfirmDialog = (expense) => {
        setExpenseToRemove(expense);
        ConfirmDialogService.open(idConfirmationRemoveExpense);
    };

    const confirmRemove = () => {
        SpinnerService.on();
        ExpenseService.delete(expenseToRemove.id)
            .then(() => {
                find(filter);
                setExpenseToRemove(INITIAL_EXPENSE_FILTER);
                ToastService.success({title:'Informação', message:'Tipo de despesa removida com sucesso.'})
            })
            .catch(() => {
                ToastService.error({title:'Informação', message:'Erro ao remover tipo de despesa. Tente novamente.'})
                SpinnerService.off();
            })
    }

    const cancelRemove = () => {
        setExpenseToRemove(INITIAL_EXPENSE_FILTER);
    }

    const customButtons = () => (
        <Button
            type="button" 
            label="Novo"
            onClick={newExpense}
            primary="true"
        />
    );    

    return (
        <Content image="dollar" title="Tipos de Despesas" subtitle="Cadastro - Listagem">
            <div className={styles.ExpenseForm}>
                <Form 
                    initialData={filter} 
                    onSubmit={confirmSearch} 
                    renderCustomButtons={customButtons}
                    confirmButtonLabel="Pesquisar"
                >
                    <div className={styles.ExpenseFields}>
                        <FormField
                            name="name" 
                            label="Nome" 
                            component={ControlText} 
                        />
                        <FormField
                            name="description" 
                            label="Descrição" 
                            component={ControlText} 
                        />
                        <FormField
                            name="active" 
                            label="Ativo" 
                            component={ControlSelect} 
                            values={YES_NO_VALUES}
                        />
                    </div>
                </Form>
            </div>

            <div className={styles.ExpenseTable}>
                <Table 
                    title="Resultado" 
                    rows={expenses}
                    columns={[
                        {label: 'Nome'},
                        {label: 'Descrição'},
                        {label: 'Ativo', width: '100px', alignment: 'center'},
                        {label: 'Ações', width: '100px', alignment: 'center'},
                    ]}
                    paginationAction={confirmSearch}
                    currentPage={filter.currentPage}
                    regsPerPage={filter.regsPerPage}
                    regsPerPageList={[5,10,15,20]}
                    totalPages={totalPages}
                >
                    <TableColumn column="name"/>
                    <TableColumn column="description" />
                    <TableColumn column="active" booleanTranslate="Sim|Não" alignment="center"/>
                    <TableColumn actions={[edit, openRemoveExpenseConfirmDialog]} alignment="center">
                        <IconButton icon="pencil" />
                        <IconButton icon="trash" />
                    </TableColumn>
                </Table>
            </div>

            <Dialog 
                id={idConfirmationRemoveExpense}
                title="Confirmação" 
                message={`Deseja remover a despesa "${expenseToRemove ? expenseToRemove.name : ''}"?`}
                onConfirm={confirmRemove}
                onCancel={cancelRemove}
            />
            
        </Content>
    );
}

Expense.displayName = 'Expense';

Expense.propTypes = {
    history: PropTypes.object.isRequired
}

export default withRouter(Expense);