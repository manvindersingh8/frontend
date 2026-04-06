import { useEffect, useState } from "react";
import { fetchApplicants } from "../store/applicantsSlice.js";
import { fetchJobs } from "../store/jobSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../components/dropdown.jsx";
import { deleteJob } from "../services/api/deleteJob.js";

const RecruiterDashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.applicants);

  // fetch recruiter's posted jobs on page load
  useEffect(() => {
    const loadJobs = async () => {
      const result = await fetchJobs();
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
        {jobs.map((ele) => (
          <li
            onClick={() => {
              setSelectedJob(ele);
              dispatch(fetchApplicants(ele._id));
            }}
            key={ele._id}
          >
            {ele.title}
            <button onClick={() => handleDelete(ele._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* applicants view */}
      {selectedJob && (
        <>
          <button onClick={() => setSelectedJob(null)}>back</button>
          <h2>{selectedJob.title}</h2>
          <Dropdown jobId={selectedJob._id} />
        </>
      )}
    </>
  );
};

export default RecruiterDashboardPage;
