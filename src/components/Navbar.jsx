import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout.js";
import { ROLES } from "../constants/constants.js";

const Navbar = () => {
  const { role, isAuthenticated } = useSelector((state) => state.auth);
  const { handleLogout } = useLogout();

  if (!isAuthenticated) return null;

  return (
    <>
      {role === ROLES.RECRUITER ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/jobs/create-job">Create Job</Link>
          <Link to="/jobs">Jobs</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/myApplications">My Applications</Link>
          <Link to="/jobs">Jobs</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </>
  );
};

export default Navbar;
