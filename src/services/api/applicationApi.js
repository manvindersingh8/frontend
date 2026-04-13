import { API } from "../axios";
export const fetchApplicants = async (jobId) => {
  try {
    const result = await API.get(`/applications?jobId=${jobId}`);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMyApplications = async () => {
  try {
    const result = await API.get(`/applications/my`);
    console.log(result);
    return result.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
