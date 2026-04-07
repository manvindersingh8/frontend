import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "user") {
    return <Navigate to="/jobs" />;
  }

  return <Outlet />;
};

export default UserRoute;
