import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    if (!localStorage.getItem('access_token')) {
        return <Navigate to="/auth/login" replace={true} />;
    }
    return children;
};

export default PrivateRoute;
