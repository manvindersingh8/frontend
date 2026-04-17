import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout.js";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import BackButton from "@/components/BackButton";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { handleLogout } = useLogout();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const backRoutes = ["/jobs/create-job", "/dashboard", "/myApplications"];
  const showBack = backRoutes.includes(location.pathname);

  return (
    <nav className="w-full bg-gradient-to-r from-[#4A6CF7] to-[#5A7CFA] text-white border-b sticky top-0 z-50 shadow-md">
      <div className="w-full px-4 py-3 flex items-center justify-between relative">
        {/* LEFT */}
        <div className="flex items-center">
          {showBack && <BackButton className="bg-white text-black" />}
        </div>

        {/* CENTER */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
          JobPortal
        </h1>

        {/* RIGHT */}
        <div className="flex justify-end">
          <Button
            size="sm"
            onClick={handleLogout}
            className="bg-red-600 text-white hover:bg-red-800"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
