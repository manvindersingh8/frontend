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
import TermsAndConditions from "./components/TermsAndConditions";
import Spinner from "./styles/spinner";
import { Toaster } from "sonner";

const App = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // ✅ Global loading screen (auth check)
  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Toaster richColors position="top-center" />

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
        <Route path="/termsAndConditions" element={<TermsAndConditions />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
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
