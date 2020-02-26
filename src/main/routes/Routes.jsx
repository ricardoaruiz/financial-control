import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../../view/home/Home';
import Login from '../../view/login/Login';
import Expense from '../../view/registrations/expense/Expense';
import Revenew from '../../view/registrations/revenew/Revenew';
import ExpenseReport from '../../view/reports/expenses/ExpenseReport';
import RevenewReport from '../../view/reports/revenew/RevenewReport';
import CheckLoggedRoute from './CheckLoggedRoute';
import PrivateRoute from './PrivateRoute';
import ExpenseForm from '../../view/registrations/expense/ExpenseForm';

const Routes = () => {
    return (
        <Switch>

            <CheckLoggedRoute 
                path='/' 
                exact 
            />

            {/* Login */}
            <Route path="/login">
                <Login />
            </Route>

            {/* Home */}
            <PrivateRoute path="/home">
                <Home />
            </PrivateRoute>
            
            {/* Registrations */}
            <PrivateRoute path="/registration/revenew">
                <Revenew />
            </PrivateRoute>
            <PrivateRoute path="/registration/expense">
                <Expense />
            </PrivateRoute>
            <PrivateRoute path="/registration/create-expense" exact>
                <ExpenseForm />
            </PrivateRoute>
            <PrivateRoute path="/registration/edit-expense/:id">
                <ExpenseForm />
            </PrivateRoute>


            {/* Reports */}
            <PrivateRoute path="/report/revenew">
                <RevenewReport />
            </PrivateRoute>
            <PrivateRoute path="/report/expense">
                <ExpenseReport />
            </PrivateRoute>

            {/* Otherwise */}
            <CheckLoggedRoute 
                path='*' 
                exact 
            />        

        </Switch>
    );
}
 
export default Routes;