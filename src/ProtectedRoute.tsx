import { Navigate, Route } from 'react-router';
import { RouteProps } from 'react-router-dom';

interface IProtectedElementProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProtectedElementProps> = ({ children }) => {
  const userRole = localStorage.getItem("userRole");

  // If the user's role matches the required role, render the element
  if (userRole === 'admin') {
    return <>{children}</>;
  }

  // Otherwise, redirect to the home page ("/")
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;