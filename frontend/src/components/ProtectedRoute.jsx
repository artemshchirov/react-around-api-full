import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

function ProtectedRoute({ children, loggedIn, isLoading }) {
  if (isLoading) return <Spinner />;

  return loggedIn ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;
