import { useEffect, useState } from "react";
import { API } from "../services/axios";
import { fetchApplicants } from "../services/api/fetchApplications.js";

const RecruiterDashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  console.log(selectedJob);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await API.get("/jobs/my");
        console.log(result);
        setJobs(result.data.data);
        console.log(jobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      <h1>Recruiter dashboard</h1>
      <h2>Listings</h2>
      <ul>
        {jobs.map((ele) => {
          return (
            <li
              onClick={() => {
                setSelectedJob(ele);
                fetchApplicants(ele._id);
              }}
              key={ele._id}
            >
              {ele.title}
            </li>
          );
        })}
      </ul>
      {selectedJob && (
        <>
          <button onClick={() => setSelectedJob(null)}>back</button>
          <h2>{selectedJob.title}</h2>
        </>
      )}
    </>
  );
};
export default RecruiterDashboardPage;
