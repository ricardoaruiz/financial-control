import './App.scss';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { Footer, Nav } from '../component/layout';
import { updateToken } from '../shared/redux/actions';
import { Routes } from './routes';

const App = props => {

  const { isLogged, updateToken } = props;

  useEffect(() => {
    updateToken();
  }, [updateToken])

  return (
    <Router>
      <div className="app">
        <Nav isShow={isLogged} />
        <Routes />
        <Footer isShow={isLogged}/>
      </div>
    </Router>
  );
}

App.propTypes = {
  isLogged: PropTypes.bool,
  updateToken: PropTypes.func
}

const mapStateToProps = state => ({ isLogged: state.auth.isLogged });
const mapDispatchToProps = dispatch => bindActionCreators( {updateToken}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
