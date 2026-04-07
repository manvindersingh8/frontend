import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateApplicantStatus } from "../store/applicantsSlice";

const ApplicantList = ({ jobId }) => {
  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.applicants);
  if (applicants.length === 0) return <h1>No applicaitons yet</h1>;
  return (
    <>
      {applicants.map((ele) => {
        return (
          <React.Fragment key={ele._id}>
            <li>
              {ele.applicantId.username} — {ele.applicantId.email}
              <select
                value={ele.status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  const confirmed = window.confirm(
                    `Change status to "${newStatus}"?`,
                  );
                  if (confirmed) {
                    dispatch(
                      updateApplicantStatus({
                        jobId: jobId,
                        applicantId: ele.applicantId._id,
                        status: newStatus,
                      }),
                    );
                  }
                }}
              >
                <option value="applied">applied</option>
                <option value="reviewing">reviewing</option>
                <option value="shortlisted">shortlisted</option>
                <option value="rejected">rejected</option>
                <option value="hired">hired</option>
              </select>
            </li>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default ApplicantList;
