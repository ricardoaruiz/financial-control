import './index.scss';
import 'font-awesome/css/font-awesome.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { startApiServer } from './backend/ApiServer';
import App from './main/App';
import Spinner from './component/spinner';
import { store } from './shared/redux';
import { Toast } from './component/toast';

if (process.env.NODE_ENV === "development") {
    startApiServer();
}

ReactDOM.render(
    <Provider store={store}>
        <App />
        <Spinner />
        <Toast />
    </Provider>
    ,document.getElementById('root')
);

