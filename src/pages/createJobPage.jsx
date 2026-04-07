import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobPostingSchema } from "../schema/jobPostingSchema.js";
import { API } from "../services/axios.js";
const CreateJobPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobPostingSchema),
  });
  const handlePostJob = async (data) => {
    try {
      await API.post(`/jobs`, data);
      alert("Job posted successfully");
      reset();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handlePostJob)}>
        <input {...register("title")} placeholder="title of job" />
        {errors.title && <p>{errors.title.message}</p>}
        <textarea
          {...register("description")}
          placeholder="Enter job description"
        />
        {errors.description && <p>{errors.description.message}</p>}
        <input
          type="number"
          {...register("salary")}
          placeholder="Enter salary"
        />
        {errors.salary && <p>{errors.salary.message}</p>}
        <input {...register("location")} placeholder="Enter job locaiton" />
        {errors.location && <p>{errors.location.message}</p>}
        <input {...register("company")} placeholder="Enter company" />
        {errors.company && <p>{errors.company.message}</p>}
        <button type="submit">Post Job</button>
      </form>
    </>
  );
};

export default CreateJobPage;
