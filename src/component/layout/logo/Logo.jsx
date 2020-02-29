import './Logo.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Logo = props => {

    const { path } = props;

    return (
        <Link to={path} className="logo">
            <span><FontAwesomeIcon icon={['fas', 'hand-holding-usd']} /></span>
            <p>Controle Financeiro</p>
        </Link>
    );
}
 
Logo.propTypes = {
    path: PropTypes.string.isRequired
}

export default Logo;