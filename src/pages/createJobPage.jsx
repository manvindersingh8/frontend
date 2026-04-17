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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateJobPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      experience: "",
      jobType: "",
      workMode: "",
    },
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
    <div className="flex justify-center px-4 py-10">
      <Card className="w-full max-w-4xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl">Post a Job</CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Fill in the details
          </p>
        </CardHeader>

        {/* 🔥 IMPORTANT FIX */}
        <CardContent className="overflow-visible">
          <form onSubmit={handleSubmit(handlePostJob)}>
            <div className="grid md:grid-cols-2 gap-6 relative">
              {/* LEFT SIDE */}
              <div className="space-y-4">
                {errors.title && (
                  <p className="text-red-500 text-center">
                    {errors.title.message}
                  </p>
                )}
                <Input {...register("title")} placeholder="Job title" />

                {errors.description && (
                  <p className="text-red-500 text-center">
                    {errors.description.message}
                  </p>
                )}
                <Textarea
                  {...register("description")}
                  placeholder="Job description"
                />

                <div className="flex gap-4">
                  <div className="w-full">
                    {errors.salary?.min && (
                      <p className="text-red-500 text-center">
                        {errors.salary.min.message}
                      </p>
                    )}
                    <Input
                      type="number"
                      min={1}
                      placeholder="Min Salary"
                      {...register("salary.min", { valueAsNumber: true })}
                    />
                  </div>

                  <div className="w-full">
                    {errors.salary?.max && (
                      <p className="text-red-500 text-center">
                        {errors.salary.max.message}
                      </p>
                    )}
                    <Input
                      type="number"
                      min={1}
                      placeholder="Max Salary"
                      {...register("salary.max", { valueAsNumber: true })}
                    />
                  </div>
                </div>

                {errors.location && (
                  <p className="text-red-500 text-center">
                    {errors.location.message}
                  </p>
                )}
                <Input {...register("location")} placeholder="Location" />

                {errors.company && (
                  <p className="text-red-500 text-center">
                    {errors.company.message}
                  </p>
                )}
                <Input {...register("company")} placeholder="Company name" />
              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-4">
                {/* EXPERIENCE */}
                <Select
                  value={watch("experience")}
                  onValueChange={(val) => setValue("experience", val)}
                >
                  <SelectTrigger className="w-full justify-center text-center">
                    <SelectValue placeholder="Select Experience" />
                  </SelectTrigger>

                  {/* 🔥 FIXED */}
                  <SelectContent
                    position="popper"
                    sideOffset={5}
                    className="z-[9999] bg-white text-black border shadow-xl backdrop-blur-none"
                  >
                    {Object.values(EXPERIENCE_LEVELS).map((exp) => (
                      <SelectItem key={exp} value={exp}>
                        {exp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* JOB TYPE */}
                <Select
                  value={watch("jobType")}
                  onValueChange={(val) => setValue("jobType", val)}
                >
                  <SelectTrigger className="w-full justify-center text-center">
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>

                  <SelectContent
                    position="popper"
                    sideOffset={5}
                    className="z-[9999] bg-white text-black border shadow-xl backdrop-blur-none"
                  >
                    {Object.values(JOB_TYPES).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* WORK MODE */}
                <Select
                  value={watch("workMode")}
                  onValueChange={(val) => setValue("workMode", val)}
                >
                  <SelectTrigger className="w-full justify-center text-center">
                    <SelectValue placeholder="Select Work Mode" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    sideOffset={5}
                    className="z-[9999] bg-white text-black border shadow-xl backdrop-blur-none"
                  >
                    {Object.values(WORK_MODES).map((mode) => (
                      <SelectItem key={mode} value={mode}>
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* SKILLS */}
                {errors.skills && (
                  <p className="text-red-500 text-center">
                    {errors.skills.message}
                  </p>
                )}
                <Input
                  {...register("skills")}
                  placeholder="Skills (comma separated)"
                />
              </div>
            </div>

            {/* BUTTON */}
            <div className="flex justify-center pt-8">
              <Button type="submit" className="w-[220px]">
                Post Job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateJobPage;
