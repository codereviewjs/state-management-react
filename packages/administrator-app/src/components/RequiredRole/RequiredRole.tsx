import { Navigate, Route, useLocation } from "react-router-dom";
import { Roles } from "types";
import { useStoreContext } from "../../context/store/Store.context";

interface RequiredRoleProps {
  role: Roles;
  redirectToRoute?: string;
  children: JSX.Element;
}

const RequiredRole = ({
  role,
  redirectToRoute = "/",
  children,
}: RequiredRoleProps) => {
  const { user } = useStoreContext();
  const location = useLocation();

  if (user?.role !== role) {
    return <Navigate to={redirectToRoute} state={{ from: location }} replace />;
  }

  return children;
};

export default RequiredRole;
