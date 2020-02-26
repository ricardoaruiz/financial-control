import './ContentHeader.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { If } from '../../../../shared';
import { logout } from '../../../../shared/redux/actions';
import IconButton from '../../../icon-button/IconButton';

const ContentHeader = (props) => {

    const { image, title, subtitle, logout } = props;

    return (
        <section className="content-header">
            <div className="page-title">
                <i className={`fa fa-${image}`} />
                <h2>{title}</h2>
                
                <If test={subtitle}>
                    <small>({subtitle})</small>
                </If>
            </div>
            <div className="page-action">
                <div className="logged-user">Ricardo Ruiz</div>
                <IconButton icon="cog" tooltip="Configurações" />
                <IconButton icon="sign-out" onClick={logout} tooltip="Sair" />
            </div>
        </section>
    );
}

ContentHeader.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    logout: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(null, mapDispatchToProps)(ContentHeader);