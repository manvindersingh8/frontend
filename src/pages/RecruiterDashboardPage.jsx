import { useEffect, useState } from "react";
import { fetchApplicants } from "../store/applicantsSlice.js";
import { fetchPostedJobs, deleteJob } from "../services/api/jobApi.js";
import { useDispatch } from "react-redux";
import ApplicantList from "../components/ApplicantList.jsx";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { APPLICATION_STATUS } from "@/constants/constants.js";

const RecruiterDashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const dispatch = useDispatch();

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

    if (success) {
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully");
    } else {
      toast.error("Failed to delete job");
    }
  };
  const getStatusColorDot = (status) => {
    switch (status) {
      case APPLICATION_STATUS.HIRED:
        return "bg-green-500";
      case APPLICATION_STATUS.REJECTED:
        return "bg-red-500";
      case APPLICATION_STATUS.SHORTLISTED:
        return "bg-blue-500";
      case APPLICATION_STATUS.REVIEWING:
        return "bg-yellow-500";
      case APPLICATION_STATUS.APPLIED:
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold">Recruiter Dashboard</h1>

      {/* Listings */}
      <div>
        <h2 className="text-lg font-medium mb-4">Your Job Listings</h2>

        {jobs.length === 0 ? (
          <p className="text-center text-muted-foreground mt-6">
            No jobs posted yet
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                onClick={() => {
                  setSelectedJob(job);
                  dispatch(fetchApplicants(job._id));
                }}
                className="group p-4 rounded-xl border bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer space-y-2"
              >
                {/* Title */}
                <h3 className="font-semibold text-base capitalize group-hover:text-blue-600 transition">
                  {job.title}
                </h3>

                {/* Company */}
                <p className="text-sm text-muted-foreground">{job.company}</p>

                {/* Location + Salary */}
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-muted-foreground">
                    📍 {job.location}
                  </span>

                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs font-medium">
                    ₹{job.salary?.min ?? 0}k - ₹{job.salary?.max ?? 0}k
                  </span>
                </div>

                {/* Hint */}
                <span className="text-[11px] text-muted-foreground">
                  Click to view applicants
                </span>

                {/* Actions */}
                <div className="flex justify-between items-center pt-3 border-t mt-3">
                  <span className="text-xs text-blue-500">
                    View applicants →
                  </span>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(job._id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Applicants Section */}
      {selectedJob && (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedJob(null)}
            className="text-sm text-blue-500 hover:text-blue-600 transition"
          >
            ← Back to listings
          </button>

          <h2 className="text-xl font-semibold capitalize">
            {selectedJob.title}
          </h2>

          <div className="bg-white border rounded-xl shadow-md p-5 space-y-4">
            <ApplicantList jobId={selectedJob._id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboardPage;
