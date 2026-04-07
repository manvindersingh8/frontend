import { useEffect, useState } from "react";
import { fetchApplicants } from "../store/applicantsSlice.js";
import { fetchPostedJobs } from "../services/api/jobApi.js";
import { useDispatch, useSelector } from "react-redux";
import ApplicantList from "../components/ApplicantList.jsx";
import { deleteJob } from "../services/api/jobApi.js";

const RecruiterDashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.applicants);

  // fetch recruiter's posted jobs on page load
  useEffect(() => {
    const loadJobs = async () => {
      const result = await fetchPostedJobs();
      setJobs(result);
    };
    loadJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) return;
    const success = await deleteJob(jobId);
    if (success) setJobs((prev) => prev.filter((job) => job._id !== jobId));
  };
  return (
    <>
      <h1>Recruiter dashboard</h1>
      <h2>Listings</h2>

      {/* job list */}
      <ul>
        {jobs.map((job) => (
          <li
            onClick={() => {
              setSelectedJob(job);
              dispatch(fetchApplicants(job._id));
            }}
            key={job._id}
          >
            {job.title}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(job._id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* applicants view */}
      {selectedJob && (
        <>
          <button onClick={() => setSelectedJob(null)}>back</button>
          <h2>{selectedJob.title}</h2>
          <ApplicantList jobId={selectedJob._id} />
        </>
      )}
    </>
  );
};

export default RecruiterDashboardPage;
