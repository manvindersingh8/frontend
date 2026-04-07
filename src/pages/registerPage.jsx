import React from "react";
import { ROLES } from "../constants/constants.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/authSchema.js";
import { API } from "../services/axios.js";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
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
    <form onSubmit={handleSubmit(handleRegister)}>
      <input {...register("username")} placeholder="username" />
      {errors.username && <p>{errors.username.message}</p>}
      <input {...register("fullname")} placeholder="fullname" />
      {errors.fullname && <p>{errors.fullname.message}</p>}
      <input {...register("email")} placeholder="email" />
      {errors.email && <p>{errors.email.message}</p>}
      <input {...register("password")} placeholder="password" />
      {errors.password && <p>{errors.password.message}</p>}
      <select {...register("role")}>
        <option>Select role</option>
        <option value={ROLES.JOBSEEKER}>Job seeker</option>
        <option value={ROLES.RECRUITER}>Recruiter</option>
      </select>
      {errors.role && <p>{errors.role.message}</p>}
      <button type="submit">Register</button>
    </form>
  );
};
export default RegisterPage;
