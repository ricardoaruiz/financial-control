import './Footer.scss';

import PropTypes from 'prop-types';
import React from 'react';

import { If } from '../../../shared';

const Footer = props => {

    const { isShow } = props;

    return (
        <If test={isShow}>
            <footer className="footer">
                <h4>Controle Financeiro</h4>
                <i className='fa fa-money' />
            </footer>
        </If>
    );
}
 
Footer.propTypes = {
    isShow: PropTypes.bool
}

export default Footer;