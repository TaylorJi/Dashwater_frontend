// PrivateRoute.tsx
import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

type PrivateRouteProps = RouteProps & {
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, ...rest }) => {
  if (isAuthenticated) {
    return <Route {...rest} />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;