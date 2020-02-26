import './Content.scss';

import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import ContentHeader from './contentHeader';

const Content = props => {

    const { children } = props;

    return (
        <Fragment>
            <ContentHeader {...props}/>
            <div className="content-body">
                <div className="content">
                    {children}
                </div>
            </div>
        </Fragment>
    );
}

Content.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired
}
 
export default Content;