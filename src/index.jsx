import './index.scss';
import 'font-awesome/css/font-awesome.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { startApiServer } from './backend/ApiServer';
import Spinner from './component/spinner';
import { Toast } from './component/toast';
import App from './main/App';
import { store } from './shared/redux';

// Add icons on the library
library.add(fab, fas)

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

