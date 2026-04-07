import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../services/axios.js";
import { useSelector } from "react-redux";
import { ROLES } from "../constants/constants.js";

const JobDetailPage = () => {
  const { id } = useParams();
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
    if (!file) {
      alert("Please upload your resume");
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
    } catch (error) {
      console.log(error);
    }
  };

  if (!job) return <h2>Loading...</h2>;

  return (
    <>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      {user?.role === ROLES.JOBSEEKER && (
        <button onClick={handleApply} disabled={isApplied}>
          {isApplied ? "Applied" : "Apply"}
        </button>
      )}
    </>
  );
};

export default JobDetailPage;
