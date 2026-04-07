import { useEffect, useState } from "react";
import { fetchMyApplications } from "../services/api/applicationApi";

const MyApplications = () => {
  const [myApplications, setMyApplications] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await fetchMyApplications();
        setMyApplications(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <h1>List of my applicaiton that i applied</h1>
      {myApplications.length === 0 ? (
        <>
          <h1>NO jobs applied yet</h1>
        </>
      ) : (
        <>
          {myApplications.map((app) => (
            <div key={app._id}>
              <h2>{app.jobId.title}</h2>
              <p>{app.jobId.company}</p>
              <p>{app.jobId.location}</p>
              <p>{app.jobId.salary}</p>
              <p>Status: {app.status}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};
export default MyApplications;
