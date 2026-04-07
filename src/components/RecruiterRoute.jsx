import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RecruiterRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return <Outlet />;
};

export default RecruiterRoute;
