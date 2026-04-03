import { useEffect, useState } from "react";
import { API } from "../services/axios";

const RecruiterDashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

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
                selectedJob(ele._id);
              }}
              key={ele._id}
            >
              {ele.title}
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default RecruiterDashboardPage;
