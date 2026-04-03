import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/authSchema";

import { useLogin } from "../hooks/useLogin.js";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const { handleLogin } = useLogin();
  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input {...register("email")} placeholder="email" />
        {errors.email && <p>{errors.email.message}</p>}
        <input {...register("password")} placeholder="password" />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
};

export default LoginPage;
