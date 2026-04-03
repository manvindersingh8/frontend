import React, { useEffect, useState } from "react";
import { fetchJobs } from "../store/jobSlice.js";
import { useSelector, useDispatch } from "react-redux";
import useDebounce from "../hooks/useDebounce.js";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout.js";
import { Link } from "react-router-dom";
import { ROLES } from "../constants/constants.js";

const JobPage = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { jobs, loading, errors, currentPage, totalJobs, totalPage } =
    useSelector((state) => state.jobs);
  const { role } = useSelector((state) => state.auth);
  const debouncedSearch = useDebounce(input, 600);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    dispatch(fetchJobs({ search: debouncedSearch, page }));
  }, [dispatch, debouncedSearch, page]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handlepre = () => {
    setPage((prev) => prev - 1);
  };
  const handlenext = () => {
    setPage((prev) => prev + 1);
  };
  const { handleLogout } = useLogout();

  return (
    <>
      <h1>this is job page</h1>
      {role === ROLES.RECRUITER && (
        <>
          <Link to="/jobs/create-job">create Job</Link>
          <Link to="/dashboard">dashboard</Link>
        </>
      )}
      <button onClick={handleLogout}>Logout</button>
      <input type="text" value={input} onChange={handleChange} />

      {loading && <h1>Jobs loading...</h1>}
      {!loading && <h1>total jobs = {totalJobs}</h1>}
      {errors && <h1>{errors}</h1>}
      <ul>
        {jobs.map((ele) => {
          return (
            <li onClick={() => navigate(`/jobs/${ele._id}`)} key={ele._id}>
              {ele.title}
            </li>
          );
        })}
      </ul>
      <button disabled={currentPage === 1 || loading} onClick={handlepre}>
        prev
      </button>

      <button
        disabled={currentPage === totalPage || loading}
        onClick={handlenext}
      >
        next
      </button>
    </>
  );
};
export default JobPage;
