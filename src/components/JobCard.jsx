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
          <CardDescription>{job.location}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <Badge variant="secondary">₹{job.salary}k</Badge>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.description}
          </p>
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
            {/* Info Row */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">📍 {job.location}</span>
              <span className="bg-gray-100 px-2 py-1 rounded">
                ₹{job.salary}k
              </span>
            </div>

            {/* Divider */}
            <div className="border-t" />

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium mb-1">Job Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {job.description}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobCard;
