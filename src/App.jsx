import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/AdminDashboard";
import Candidates from "./pages/CandidateDashboard";
import Jobs from "./pages/Jobs";
import Settings from "./pages/Settings";
import Footer from "./components/layout/Footer";
import Profile from "./pages/Profile";
import InterviewRoom from "./pages/InterviewRoom";
import PostJob from "./pages/PostJob";
import JobListings from "./pages/JobListings";
import Contact from "./pages/Contact";
import FrontendTest from "./pages/FrontendTest";
import FrontendTestSecond from "./pages/FrontendTestSecond";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/interview-room" element={<InterviewRoom />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/jobs-listings" element={<JobListings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/frontendTest" element={<FrontendTest />} />
        <Route path="/FrontendTestSecond" element={<FrontendTestSecond />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
/>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
