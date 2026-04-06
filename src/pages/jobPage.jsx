import { useEffect, useState } from "react";
import { fetchJobs } from "../store/jobSlice.js";
import { useSelector, useDispatch } from "react-redux";
import useDebounce from "../hooks/useDebounce.js";
import JobCard from "../components/JobCard.jsx";

const JobPage = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const { jobs, loading, errors, currentPage, totalJobs, totalPage } =
    useSelector((state) => state.jobs);
  const debouncedSearch = useDebounce(input, 600);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    dispatch(fetchJobs({ search: debouncedSearch, page }));
  }, [dispatch, debouncedSearch, page]);

  return (
    <>
      <h1>Jobs</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search jobs..."
      />
      {loading && <p>Loading...</p>}
      {!loading && <p>Total jobs: {totalJobs}</p>}
      {errors && <p>{errors}</p>}
      <ul>
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </ul>
      <button
        disabled={currentPage === 1 || loading}
        onClick={() => setPage((p) => p - 1)}
      >
        Prev
      </button>
      <button
        disabled={currentPage === totalPage || loading}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </button>
    </>
  );
};

export default JobPage;
