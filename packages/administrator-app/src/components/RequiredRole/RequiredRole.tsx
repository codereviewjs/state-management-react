import { Navigate, useLocation } from "react-router-dom";
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
  const { auth } = useStoreContext();
  const location = useLocation();

  if (auth.data?.role !== role) {
    return <Navigate to={redirectToRoute} state={{ from: location }} replace />;
  }

  return children;
};

export default RequiredRole;
