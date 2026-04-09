import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/authSchema.js";
import { pageWrapper, inputStyle, errorStyle } from "@/styles/class.js";
import { Card } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { useLogin } from "../hooks/useLogin.js";
import Illustration from "@/assets/login.svg"; // 👈 add a login illustration

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { handleLogin } = useLogin();

  return (
    <div className={pageWrapper}>
      {/* 🌊 Wave */}
      <motion.div
        initial={{ y: 220 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 z-0 pointer-events-none"
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
      <div className="relative z-10 flex min-h-screen items-center justify-end px-6 md:px-12 lg:px-16">
        {/* LEFT ILLUSTRATION */}
        <motion.div
          initial={{ x: -180, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="hidden md:block absolute bottom-0 left-[5%] w-[45vw] max-w-[750px]"
        >
          <img
            src={Illustration}
            alt="Login Illustration"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* CARD */}
        <motion.div
          initial={{ x: 180, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex w-full justify-end md:w-[50%] md:pr-[5vw] lg:pr-[6vw]"
        >
          <Card className="glass-card w-full max-w-[520px] p-6">
            <h2 className="text-2xl font-semibold text-center mb-2">
              Welcome back
            </h2>

            <p className="text-sm text-gray-500 text-center mb-4">
              Login to continue
            </p>

            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex flex-col gap-4"
            >
              {errors.email && (
                <p className={errorStyle}>{errors.email.message}</p>
              )}
              <input
                {...register("email")}
                type="email"
                placeholder="email"
                className={inputStyle}
              />

              {errors.password && (
                <p className={errorStyle}>{errors.password.message}</p>
              )}
              <input
                {...register("password")}
                type="password"
                placeholder="password"
                className={inputStyle}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full text-base bg-blue-500 hover:bg-blue-600 text-white mt-4 rounded-md disabled:opacity-50"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>

            <h4 className="mt-4 text-center">
              Dont have an account?{" "}
              <Button variant="default">
                <Link to="/register">Register</Link>
              </Button>
            </h4>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
