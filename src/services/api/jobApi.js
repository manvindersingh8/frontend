import { API } from "../axios";

export const deleteJob = async (jobId) => {
  try {
    await API.delete(`/jobs/${jobId}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchPostedJobs = async () => {
  try {
    const result = await API.get("/jobs/my");
    console.log(result);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};
