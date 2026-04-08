import React from "react";
import { ROLES } from "../constants/constants.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/authSchema.js";
import { API } from "../services/axios.js";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { errorStyle, inputStyle, pageWrapper } from "../styles/class.js";
import { motion } from "framer-motion";

import Illustration from "@/assets/register.svg";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await API.post(`/auth/register`, data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

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
        {/* LEFT SVG ILLUSTRATION */}
        <motion.div
          initial={{ x: -180, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="hidden md:block absolute bottom-0 left-[5%] w-[45vw] max-w-[750px]"
        >
          <img
            src={Illustration}
            alt="Register Illustration"
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
          <Card className="glass-card w-full max-w-[520px]">
            <h2 className="text-2xl font-semibold text-center mb-2">
              Register with us
            </h2>

            <p className="text-sm text-gray-500 text-center mb-4">
              Create your account to get started
            </p>

            <form
              onSubmit={handleSubmit(handleRegister)}
              className="flex flex-col gap-4"
            >
              {errors.username && (
                <p className={errorStyle}>{errors.username.message}</p>
              )}
              <input
                {...register("username")}
                placeholder="username"
                className={inputStyle}
              />

              {errors.fullname && (
                <p className={errorStyle}>{errors.fullname.message}</p>
              )}
              <input
                {...register("fullname")}
                placeholder="fullname"
                className={inputStyle}
              />

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

              {errors.role && (
                <p className={errorStyle}>{errors.role.message}</p>
              )}

              <Select
                onValueChange={(value) =>
                  setValue("role", value, { shouldValidate: true })
                }
              >
                <SelectTrigger className="w-full border rounded-md focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={ROLES.JOBSEEKER}>👤 Job seeker</SelectItem>
                  <SelectItem value={ROLES.RECRUITER}>🏢 Recruiter</SelectItem>
                </SelectContent>
              </Select>

              <Button
                type="submit"
                className="h-11 w-full text-base bg-blue-500 hover:bg-blue-600 text-white mt-6"
              >
                Register
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
