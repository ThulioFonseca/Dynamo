import Login from "../pages/Login/Login";
import { useAuth } from "../services/AuthProvider";

const PrivateRoute = ({ Item }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Item /> : <Login />;
};

export default PrivateRoute;
