import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const navigate = useNavigate();
    const { email, logout, isAuthenticated} = useAuth();

    const [jobId, setJobId] = useState("");
    const [modelId, setModelId] = useState("");

    function handleLogOut() {
        logout();
        
        navigate("/login");
        alert("Logged out");
    }

return (
  <nav className="navbar">
    <div className="nav-left">
      <Link to="/pages/manager/jobs">All Jobs</Link>
      <Link to="/pages/model/create-model">Create Models</Link>
      <Link to="/manager/create+new+manager">Create Manager</Link>
      <Link to="/manager/Create+job">Create Job</Link>
      <Link to="/model/AllModelJobsPage">All jobs for model </Link>
    </div>

    <div>
      {isAuthenticated && email && <span>Logged in as: {email}</span>}
    </div>
    <div className="logout-container">
      <button onClick={handleLogOut}>Log out</button>
    </div>
  </nav>
    );
}
