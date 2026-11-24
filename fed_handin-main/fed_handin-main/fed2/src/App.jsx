import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from "./components/Navbar";
import AllJobsPage from "./pages/manager/AllJobsPage";
import CreateManagerPage from "./pages/manager/CreateManagerPage.jsx"
import ManagerJobsPage from "./pages/manager/ManagerJobsPage.jsx"
import CreateModelPage from './pages/model/CreateModelPage.jsx';
import LoginPage from './pages/LoginPage';
import JobExpensesPage from "./pages/manager/JobExpensesPage";
import AllModelJobsPage from "./pages/model/AllModelJobsPage";
import './App.css'
import CreateExpensePage from './pages/model/CreateExpensePage';import ProtectedRoute from "./routes/AppRoutes";


function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <h1>Welcome to website</h1>
        <Navbar />
        <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute allowedRoles={["Manager"]} />}>
        <Route path="/pages/manager/jobs" element={<AllJobsPage />} />
        <Route path="/pages/manager/jobs/:id/expenses" element={<JobExpensesPage />} />
        <Route path="/manager/create+new+manager" element={<CreateManagerPage />} />
        <Route path="/manager/Create+job" element={<ManagerJobsPage />} />
        <Route path="/pages/model/create-model" element={<CreateModelPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["Model"]} />}>
        <Route path="/model/AllModelJobsPage" element={<AllModelJobsPage />} />
        <Route path="/model/jobs/:jobId/expenses/create" element={<CreateExpensePage />} />
      </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
