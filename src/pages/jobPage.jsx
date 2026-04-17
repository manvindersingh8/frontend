import { useEffect, useState } from "react";
import { fetchJobs } from "../store/jobSlice.js";
import { useSelector, useDispatch } from "react-redux";
import useDebounce from "../hooks/useDebounce.js";
import JobCard from "@/components/JobCard.jsx";
import DashboardLayout from "@/components/DashboardLayout.jsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  WORK_MODES,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
} from "@/constants/constants.js";

const JobPage = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    experienceLevel: "",
    workMode: "",
  });
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const { jobs, loading, errors, currentPage, totalJobs, totalPage } =
    useSelector((state) => state.jobs);
  const debouncedSearch = useDebounce(input, 600);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    dispatch(fetchJobs({ search: debouncedSearch, page, ...filters }));
  }, [dispatch, debouncedSearch, page, filters]);

  const handleFilterChange = (key, value) => {
    setPage(1); // reset pagination
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold">Jobs</h1>

        {/* Search + Info */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search jobs..."
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Location */}
              <Input
                placeholder="Location"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />

              {/* Job Type */}
              <select
                className="border rounded px-2 py-2"
                value={filters.jobType}
                onChange={(e) => handleFilterChange("jobType", e.target.value)}
              >
                <option value="">All Types</option>
                {Object.values(JOB_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {/* experienceLevel */}
              <select
                className="border rounded px-2 py-2"
                value={filters.experienceLevel}
                onChange={(e) =>
                  handleFilterChange("experienceLevel", e.target.value)
                }
              >
                <option value="">All Levels</option>
                {Object.values(EXPERIENCE_LEVELS).map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>

              {/* Work Mode */}
              <select
                className="border rounded px-2 py-2"
                value={filters.workMode}
                onChange={(e) => handleFilterChange("workMode", e.target.value)}
              >
                <option value="">All Modes</option>
                {Object.values(WORK_MODES).map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-muted-foreground">
              {loading && <p>Loading...</p>}
              {!loading && <p>Total jobs: {totalJobs}</p>}
              {errors && <p className="text-red-500">{errors}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Jobs Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            disabled={currentPage === 1 || loading}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>

          <span className="text-sm font-medium">
            Page {currentPage} of {totalPage}
          </span>

          <Button
            variant="outline"
            disabled={currentPage === totalPage || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobPage;
