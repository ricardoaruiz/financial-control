import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthService from '../../shared/service/AuthService';

const PrivateRoute = ({ children, location, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={() =>
                AuthService.isLogged() 
                    ? ( 
                        children
                    ) 
                    : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
      );
}

PrivateRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    location: PropTypes.object
}
 
export default PrivateRoute;