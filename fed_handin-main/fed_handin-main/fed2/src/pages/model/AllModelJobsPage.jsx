import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../../Api/client"; // Look in client.js

export default function ModelJobsPage() {
  const [jobs, setJobs] = useState([]); // To list jobs
  const [message, setMessage] = useState(""); // For errors
  const [expandedJob, setExpandedJob] = useState(null); // For currently expanded job

  const modelId = localStorage.getItem("modelId"); // Old code, this logic is now executed in client.js
  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        setMessage("Error: " + error.message);
      }
    }

    fetchJobs();
  }, []);

 return (
    <div>
      <h1>My Jobs</h1>

      {message && <p>{message}</p>}

      {jobs.length === 0 && <p>No jobs found</p>}

      {jobs.map((job) => (
        <div key={job.jobId}>
          <p><strong>{job.customer}</strong></p>
          <p>{job.location}</p>
          <p>{job.days} days</p>

{/* Essentially expands or collapses a job based on current state */}
          <button  
            onClick={() =>
              setExpandedJob(expandedJob === job.jobId ? null : job.jobId)
            }
          >
            View Details
          </button>
{/* Fills in the expandedJob field with its details and data */}
          {expandedJob === job.jobId && (
            <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
              <p><strong>Job ID:</strong> {job.jobId}</p>
              <p><strong>Customer:</strong> {job.customer}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Days:</strong> {job.days}</p>
            </div>
          )}

          <Link to={`/model/jobs/${job.jobId}/expenses/create`}>
            <button>Tilføj udgift</button>
          </Link>
          <hr />
          
        </div>
        
      ))}
    </div>
  );
}