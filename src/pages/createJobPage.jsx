import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobPostingSchema } from "../schema/jobPostingSchema.js";
import {
  JOB_TYPES,
  WORK_MODES,
  EXPERIENCE_LEVELS,
} from "@/constants/constants.js";
import { API } from "../services/axios.js";

import { Card } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { motion } from "framer-motion";

import { errorStyle, inputStyle, pageWrapper } from "../styles/class.js";

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
      alert("Job posted successfully 🚀");
      reset();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div className={pageWrapper}>
      {/* 🌊 Background Wave */}
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-x-0 bottom-0 z-0 pointer-events-none"
      >
        <svg
          className="w-full h-[55vh]"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 C300,100 900,500 1200,300 L1200,600 L0,600 Z"
            className="fill-blue-500 opacity-90"
          />
        </svg>
      </motion.div>

      {/* FORM CARD */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[600px]"
        >
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-semibold text-center mb-2">
              Post a Job
            </h2>

            <p className="text-sm text-gray-500 text-center mb-6">
              Fill in the details to create a new job listing
            </p>

            <form
              onSubmit={handleSubmit(handlePostJob)}
              className="flex flex-col gap-4"
            >
              {/* TITLE */}
              {errors.title && (
                <p className={errorStyle}>{errors.title.message}</p>
              )}
              <input
                {...register("title")}
                placeholder="Job title"
                className={inputStyle}
              />

              {/* DESCRIPTION */}
              {errors.description && (
                <p className={errorStyle}>{errors.description.message}</p>
              )}
              <textarea
                {...register("description")}
                placeholder="Job description"
                className={inputStyle + " h-28 resize-none"}
              />

              {/* SALARY */}
              <div className="flex gap-3">
                <div className="w-full">
                  {errors.salary?.min && (
                    <p className={errorStyle}>{errors.salary.min.message}</p>
                  )}
                  <input
                    type="number"
                    min={1}
                    placeholder="Min Salary"
                    {...register("salary.min", { valueAsNumber: true })}
                    className={inputStyle}
                  />
                </div>

                <div className="w-full">
                  {errors.salary?.max && (
                    <p className={errorStyle}>{errors.salary.max.message}</p>
                  )}
                  <input
                    type="number"
                    min={1}
                    placeholder="Max Salary"
                    {...register("salary.max", { valueAsNumber: true })}
                    className={inputStyle}
                  />
                </div>
              </div>

              {/* LOCATION */}
              {errors.location && (
                <p className={errorStyle}>{errors.location.message}</p>
              )}
              <input
                {...register("location")}
                placeholder="Location"
                className={inputStyle}
              />

              {/* COMPANY */}
              {errors.company && (
                <p className={errorStyle}>{errors.company.message}</p>
              )}
              <input
                {...register("company")}
                placeholder="Company name"
                className={inputStyle}
              />

              {/* EXPERIENCE */}
              {errors.experience && (
                <p className={errorStyle}>{errors.experience.message}</p>
              )}
              <select {...register("experience")} className={inputStyle}>
                <option value="">Select Experience</option>
                {Object.values(EXPERIENCE_LEVELS).map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>

              {/* JOB TYPE */}
              {errors.jobtype && (
                <p className={errorStyle}>{errors.jobtype.message}</p>
              )}
              <select {...register("jobtype")} className={inputStyle}>
                <option value="">Select Job Type</option>
                {Object.values(JOB_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {/* WORK MODE */}
              {errors.workMode && (
                <p className={errorStyle}>{errors.workMode.message}</p>
              )}
              <select {...register("workMode")} className={inputStyle}>
                <option value="">Select Work Mode</option>
                {Object.values(WORK_MODES).map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>

              {/* SKILLS */}
              {errors.skills && (
                <p className={errorStyle}>{errors.skills.message}</p>
              )}
              <input
                {...register("skills")}
                placeholder="Skills (comma separated)"
                className={inputStyle}
              />

              {/* BUTTON */}
              <Button
                type="submit"
                className="h-11 w-full text-base bg-blue-500 hover:bg-blue-600 text-white mt-4"
              >
                Post Job
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateJobPage;
