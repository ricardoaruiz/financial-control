import './Logo.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = props => {

    const { path } = props;

    return (
        <Link to={path} className="logo">
            <i className="fa fa-money"></i>
            <p>Controle Financeiro</p>
        </Link>
    );
}
 
Logo.propTypes = {
    path: PropTypes.string.isRequired
}

export default Logo;