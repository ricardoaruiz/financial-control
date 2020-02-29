import './Footer.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { If } from '../../../shared';

const Footer = props => {

    const { isShow } = props;

    return (
        <If test={isShow}>
            <footer className="footer">
                <h4>Controle Financeiro</h4>
                <span><FontAwesomeIcon icon={['fas', 'hand-holding-usd']} /></span>
            </footer>
        </If>
    );
}
 
Footer.propTypes = {
    isShow: PropTypes.bool
}

export default Footer;