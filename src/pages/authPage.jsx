import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Illustration from "@/assets/illustration.svg";
import { primaryBtn, pageWrapper } from "@/styles/class";
const AuthPage = () => {
  return (
    <div className={pageWrapper}>
      {/* 🌊 Wave BACKGROUND */}
      <motion.div
        initial={{ y: 220 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 z-0 pointer-events-none will-change-transform"
      >
        <svg
          className="w-full h-[60vh]"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 C300,100 900,500 1200,300 L1200,600 L0,600 Z"
            className="fill-blue-500 opacity-90"
          />
        </svg>
      </motion.div>

      {/* MAIN LAYOUT */}
      <div className="relative z-10 flex min-h-screen items-center justify-between px-6 md:px-12 lg:px-16">
        {/* LEFT IMAGE */}
        <motion.div
          initial={{ x: -180, opacity: 0 }}
          animate={{ x: -20, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="absolute bottom-0 left-[-5%] w-[65vw] max-w-[1000px]"
        >
          <img
            src={Illustration}
            alt="Illustration"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          initial={{ x: 180, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.65, ease: "easeOut" }}
          className="flex w-full justify-end md:pr-[12vw] lg:pr-[14vw]"
        >
          <div className="glass-card w-full max-w-[420px]">
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              Access your account or create a new one
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link to="/login">
                <Button className={primaryBtn}>Login</Button>
              </Link>

              <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                <div className="h-px flex-1 bg-gray-200" />
                OR
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <Link to="/register">
                <Button
                  variant="outline"
                  className="h-11 w-full border-gray-300 text-base hover:bg-gray-100"
                >
                  Register
                </Button>
              </Link>
            </div>

            <Link to="/termsAndConditions" className="mt-5 block">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our Terms &amp; Privacy Policy
              </p>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
