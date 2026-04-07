import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import JobPage from "./pages/jobPage";
import JobDetailPage from "./pages/jobDetailPage";
import CreateJobPage from "./pages/createJobPage";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import ProtectedRoute from "./components/protectedRoute";
import AuthPage from "./pages/authPage";
import RecruiterDashboardPage from "./pages/RecruiterDashboardPage";
import Navbar from "./components/Navbar";
import MyApplications from "./pages/myApplicationsPage";
import RecruiterRoute from "./components/RecruiterRoute";
import UserRoute from "./components/UserRoute";
const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Root */}
        <Route
          path="/"
          element={!isAuthenticated ? <AuthPage /> : <Navigate to="/jobs" />}
        />

        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected (login required) */}
        <Route element={<ProtectedRoute />}>
          {/* Common */}
          <Route path="/jobs" element={<JobPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />

          {/* Recruiter Only */}
          <Route element={<RecruiterRoute />}>
            <Route path="/jobs/create-job" element={<CreateJobPage />} />
            <Route path="/dashboard" element={<RecruiterDashboardPage />} />
          </Route>

          {/* Jobseeker Only */}
          <Route element={<UserRoute />}>
            <Route path="/myApplications" element={<MyApplications />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
