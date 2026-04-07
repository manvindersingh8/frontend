import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AuthPage = () => {
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200">
      {/* 🌊 Wave BACKGROUND (correct position) */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute bottom-[-10%] left-[-20%] w-[140%] h-[140%] animate-wave"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          <path
            d="M0,300 C300,500 900,100 1200,200 L1200,600 L0,600 Z"
            className="fill-blue-500 opacity-80"
          />
        </svg>
      </div>

      {/* 🧊 Card */}
      <div
        className="relative z-10 flex flex-col gap-5 p-10 w-96 text-center rounded-2xl
  bg-white/70 backdrop-blur-xl border border-white/40
  shadow-[0_20px_50px_rgba(0,0,0,0.08)]
  hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]
  transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
  animate-fade-in
  hover:scale-105 hover:-translate-y-1
  will-change-transform"
        style={{ animationDelay: "0.6s", animationFillMode: "both" }}
      >
        <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>

        <p className="text-gray-500 text-sm">
          Access your account or create a new one
        </p>

        <div className="flex flex-col gap-3 mt-2">
          <Link to="/login">
            <Button className="w-full h-11 text-base shadow-sm hover:shadow-md transition-all">
              Login
            </Button>
          </Link>

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
