import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Page name and "link" in route
export default function AllJobsPage() {
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState("");
    const [expensesByJob, setExpensesByJob] = useState({});

    // Fetches jobs. Only runs the first time page is loaded because of the "[]"
    useEffect(() => {
        fetchJobs();
    }, []);

    // The function itself
    async function fetchJobs() {
        try {
            const res = await fetch("http://localhost:8080/Api/jobs", {
                 // Where API holds the jobs
                 headers: {
                    Authorization: "Bearer " + localStorage.getItem("token") // JWT Token
            }
            });

            if (!res.ok){
                throw new Error("Failed to fetch jobs!");
            }

            const data = await res.json();
            setJobs(data);

        } catch (err) {
            setMessage("Error: " + err.message);
        }
    }

      async function fetchExpenses(jobId) {
    try {
      const res = await fetch(
        `http://localhost:8080/api/Expenses/${jobId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (!res.ok) {
        throw new Error("No expseses associated with this job");
      }

      const data = await res.json();

      // Save data per jobId
      setExpensesByJob((prev) => ({
        ...prev,
        [jobId]: data,
      }));
    } catch (err) {
      setExpensesByJob((prev) => ({
        ...prev,
        [jobId]: { error: err.message },
      }));
    }
  }

      return (
    <div>
      <h1>All Jobs</h1>

      {message && <p>{message}</p>}

      {jobs.map((job) => (
        <div key={job.jobId}>
          <p><strong>{job.customer}</strong></p>
          <p>{job.location}</p>
          <p>{job.days} days</p>

          <button onClick={() => fetchExpenses(job.jobId)}>
            View Expenses
          </button>
          
          {expensesByJob[job.jobId] && (
            <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
              {expensesByJob[job.jobId].error ? (
                <p style={{ color: "red" }}>
                  {expensesByJob[job.jobId].error}
                </p>
              ) : (
                <>
                  <p><strong>ExpenseId:</strong> {expensesByJob[job.jobId].expenseId}</p>
                  <p><strong>Text:</strong> {expensesByJob[job.jobId].text}</p>
                  <p><strong>Amount:</strong> {expensesByJob[job.jobId].amount}</p>
                  <p><strong>Date:</strong> {expensesByJob[job.jobId].date}</p>
                </>
              )}
            </div>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
}