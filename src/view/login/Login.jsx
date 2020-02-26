import './Login.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from '../../shared/redux/actions';

const Login = props => {

    const { login, history } = props;

    const doLogin = () => {
        login();
        history.push('/home');
    }

    return (
        <div>
            Login
            <button onClick={doLogin}>Login</button>
        </div>
    );
}
 
Login.propTypes = {
    login: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => bindActionCreators( {login}, dispatch);

export default connect(null, mapDispatchToProps)(withRouter(Login));