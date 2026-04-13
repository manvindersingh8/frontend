import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ROLES } from "@/constants/constants";

const Sidebar = () => {
  const { role } = useSelector((state) => state.auth);
  const location = useLocation();

  const linkClass = (path) =>
    `block p-2 rounded text-sm ${
      location.pathname === path
        ? "bg-blue-100 text-blue-600"
        : "hover:bg-gray-100"
    }`;

  return (
    <div className="hidden md:block w-64 border-r p-4 h-[calc(100vh-64px)] sticky top-16">
      <h2 className="font-semibold mb-4">Menu</h2>

      <div className="space-y-2">
        {role === ROLES.RECRUITER ? (
          <>
            <Link to="/jobs" className={linkClass("/jobs")}>
              Jobs
            </Link>
            <Link
              to="/jobs/create-job"
              className={linkClass("/jobs/create-job")}
            >
              Create Job
            </Link>
            <Link to="/dashboard" className={linkClass("/dashboard")}>
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link to="/jobs" className={linkClass("/jobs")}>
              Jobs
            </Link>
            <Link to="/myApplications" className={linkClass("/myApplications")}>
              My Applications
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
