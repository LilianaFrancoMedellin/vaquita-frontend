import { Navigate } from 'react-router-dom';

const LogoutPage = () => {
  sessionStorage.removeItem('token');

  return <Navigate to="/login" replace />;
};

export default LogoutPage;
