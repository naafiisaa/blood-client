import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const RoleRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [userRole, isRoleLoading] = useRole();

  if (loading || isRoleLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && (userRole === 'admin' || userRole === 'volunteer')) {
    return children;
  }

  return <Navigate to='/' state={{ from: location }} replace></Navigate>;
};

export default RoleRoute;
