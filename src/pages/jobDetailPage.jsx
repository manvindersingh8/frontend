import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../services/axios.js";
import { useSelector } from "react-redux";
import { ROLES } from "../constants/constants.js";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [file, setFile] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const [jobResult, appliedResult] = await Promise.all([
          API.get(`/jobs/${id}`),
          API.get(`/applications/${id}`),
        ]);
        setJob(jobResult.data.data);
        setIsApplied(appliedResult.data.data.hasApplied);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (isApplied) {
      toast.info("You have already applied to this job");
      return;
    }

    if (!file) {
      toast.error("Please upload your resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      await API.post(`/applications/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsApplied(true);
      toast.success("Application submitted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to apply");
    }
  };

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <Card className="shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold capitalize">
            {job.title}
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            {job.company} • {job.location}
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Salary */}
          <div className="text-sm">
            <span className="bg-gray-100 px-2 py-1 rounded-md text-xs font-medium">
              ₹{job.salary?.min ?? 0}k - ₹{job.salary?.max ?? 0}k
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium mb-1">Job Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Resume Upload */}
          {user?.role === ROLES.JOBSEEKER && (
            <div className="space-y-3">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="text-sm"
              />

              <div className="flex gap-3">
                <Button
                  onClick={handleApply}
                  disabled={isApplied}
                  className="flex-1"
                >
                  {isApplied ? "Applied" : "Apply Now"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate("/myApplications")}
                >
                  View Applications
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetailPage;
