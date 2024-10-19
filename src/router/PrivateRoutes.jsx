import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return user ? <>{children}</> : <Navigate to={"/login"}></Navigate>;
};

export default PrivateRoutes;
