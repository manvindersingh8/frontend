import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
import { ROLES } from "../constants/constants.js";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (role === ROLES.RECRUITER) {
      setOpen(true);
    } else {
      navigate(`/jobs/${job._id}`);
    }
  };

  return (
    <>
      {/* Card */}
      <Card
        onClick={handleClick}
        className="w-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <CardHeader>
          <CardTitle className="capitalize">{job.title}</CardTitle>
          <CardDescription>
            {job.company} • {job.location}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Salary */}
          <Badge variant="secondary">
            ₹{job.salary?.min ?? 0}k - ₹{job.salary?.max ?? 0}k
          </Badge>

          {/* Quick Info (🔥 added experience here too) */}
          <div className="flex gap-2 flex-wrap">
            <Badge>{job.jobType}</Badge>
            <Badge variant="secondary">{job.workMode}</Badge>
            <Badge variant="outline">{job.experienceLevel || "N/A"}</Badge>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {job.skills?.slice(0, 3).map((skill, i) => (
              <Badge key={i} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>

          {/* Short Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.description || "No description provided"}
          </p>

          {/* Hint */}
          <p className="text-xs text-blue-500">View details →</p>
        </CardContent>
      </Card>

      {/* Popup for Recruiter */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold capitalize">
              {job.title}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {/* Info */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">📍 {job.location}</span>
              <span className="bg-gray-100 px-2 py-1 rounded">
                ₹{job.salary?.min ?? 0}k - ₹{job.salary?.max ?? 0}k
              </span>
            </div>

            {/* Extra Info */}
            <div className="flex gap-2 flex-wrap">
              <Badge>{job.jobType}</Badge>
              <Badge variant="secondary">{job.workMode}</Badge>
              <Badge variant="outline">{job.experienceLevel || "N/A"}</Badge>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {job.skills?.map((skill, i) => (
                <Badge key={i} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="border-t" />

            {/* Full Description */}
            <div>
              <h3 className="text-sm font-medium mb-1">Job Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {job.description || "No description available"}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobCard;
