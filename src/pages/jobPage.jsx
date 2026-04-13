import { useEffect, useState } from "react";
import { fetchJobs } from "../store/jobSlice.js";
import { useSelector, useDispatch } from "react-redux";
import useDebounce from "../hooks/useDebounce.js";
import JobCard from "@/components/JobCard.jsx";
import DashboardLayout from "@/components/DashboardLayout.jsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
