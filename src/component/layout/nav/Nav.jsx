import './Nav.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { If } from '../../../shared';
import { Logo } from '../index';

const Nav = props => {

    const { isShow } = props;

    return (
        <If test={isShow}>
            <Logo path="/home"/>
            <nav className="nav">

                <div>Cadastros</div>
                <ul>
                    <li>
                        <Link to='/registration/revenew'>Tipos de Receitas</Link>
                    </li>
                    <li>
                        <Link to={`/registration/expense`}>Tipos de Despesas</Link>
                    </li>
                </ul>

                <div>Relatórios</div>
                <ul>
                    <li>
                        <Link to={`/report/revenew`}>Receitas</Link>
                    </li>
                    <li>
                        <Link to={`/report/expense`}>Despesas</Link>
                    </li>
                </ul>
            </nav>
        </If>
    );
}
 
Nav.propTypes = {
    isShow: PropTypes.bool
}

export default Nav;