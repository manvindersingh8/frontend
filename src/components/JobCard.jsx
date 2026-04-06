import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return <li onClick={() => navigate(`/jobs/${job._id}`)}>{job.title}</li>;
};

export default JobCard;
