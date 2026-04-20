import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateApplicantStatus } from "../store/applicantsSlice";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { APPLICATION_STATUS } from "@/constants/constants";

const ApplicantList = ({ jobId }) => {
  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.applicants);

  const getStatusVariant = (status) => {
    switch (status) {
      case APPLICATION_STATUS.HIRED:
        return "default";
      case APPLICATION_STATUS.REJECTED:
        return "destructive";
      case APPLICATION_STATUS.SHORTLISTED:
        return "outline";
      case APPLICATION_STATUS.REVIEWING:
        return "secondary";
      case APPLICATION_STATUS.APPLIED:
        return "secondary";
      default:
        return "secondary";
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

  if (applicants.length === 0) {
    return <p className="text-sm text-muted-foreground">No applications yet</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {applicants.map((ele) => (
        <div
          key={ele._id}
          className="p-4 border rounded-xl shadow-sm bg-white space-y-4"
        >
          <h3 className="font-medium capitalize">{ele.applicantId.username}</h3>

          <p className="text-sm text-muted-foreground">
            {ele.applicantId.email}
          </p>

          <div className="flex justify-between items-center gap-3">
            <Badge variant={getStatusVariant(ele.status)}>{ele.status}</Badge>

            <Select
              defaultValue={ele.status}
              onValueChange={(value) => {
                const confirmed = window.confirm(
                  `Change status to "${value}"?`,
                );

                if (confirmed) {
                  dispatch(
                    updateApplicantStatus({
                      jobId,
                      applicantId: ele.applicantId._id,
                      status: value,
                    }),
                  );
                }
              }}
            >
              <SelectTrigger className="w-[160px]">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${getStatusColorDot(
                      ele.status,
                    )}`}
                  />
                  <SelectValue />
                </div>
              </SelectTrigger>

              <SelectContent>
                {Object.values(APPLICATION_STATUS).map((status) => (
                  <SelectItem key={status} value={status}>
                    <div className="flex items-center gap-2 capitalize">
                      <span
                        className={`w-2 h-2 rounded-full ${getStatusColorDot(
                          status,
                        )}`}
                      />
                      {status}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicantList;
