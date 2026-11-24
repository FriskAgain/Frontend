import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated } = useAuth();
  const role = localStorage.getItem("role");

  if (!isAuthenticated) { 
    alert("Access denied");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    alert("Access denied");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
