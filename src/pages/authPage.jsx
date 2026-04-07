import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AuthPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div
        className="flex flex-col gap-5 p-10 w-96 text-center rounded-2xl
        bg-white/70 backdrop-blur-xl border border-white/40
        shadow-[0_20px_50px_rgba(0,0,0,0.08)]
        hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]
        transition-all duration-300 animate-fade-in"
      >
        {/* Heading */}
        <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>

        <p className="text-gray-500 text-sm">
          Access your account or create a new one
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-2">
          <Link to="/login">
            <Button className="w-full h-11 text-base shadow-sm hover:shadow-md transition-all">
              Login
            </Button>
          </Link>

          {/* Divider */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
            <div className="flex-1 h-px bg-gray-200" />
            OR
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <Link to="/register">
            <Button
              variant="outline"
              className="w-full h-11 text-base border-gray-300 hover:bg-gray-100"
            >
              Register
            </Button>
          </Link>
        </div>

        {/* Extra CTA */}
        <Link to="/termsAndConditions">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
