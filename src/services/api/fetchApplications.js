import { API } from "../axios";

// fetchApplications.js
export const fetchApplicants = async (jobId) => {
  try {
    const result = await API.get(`/applications?jobId=${jobId}`);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};
