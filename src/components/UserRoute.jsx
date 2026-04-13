import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROLES } from "../constants/constants";

const UserRoute = () => {
  const { user, role } = useSelector((state) => state.auth);

  if (!user || role !== ROLES.JOBSEEKER) {
    return <Navigate to="/jobs" />;
  }

  return <Outlet />;
};

export default UserRoute;
