import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

import About from "./About";
import ForgotPassword from "./ForgotPassword"; // Removed stray `zz`
import JobSeekerLogin from "./.JobSeekerLogin";
import JobSeekersSignUp from "./JobSeekersSignUp";
import JobSeekerForgotPassword from "./JobSeekerForgotPassword";
import EmployeeLogin from "./EmployeeLogin";
import EmployerSignUp from "./EmployeeSignUp";
import EmployeeForgotPassword from "./EmployeeForgotPassword";
import JobApplicationForm from "./JobApplicationForm";
import EmployeeAppForm from "./EmployeeAppForm";
import ContactUs from "./ContactUs";
import EditJobForm from "./EditJobForm";
import JobListings from "./JobListings";
import EmployerDashboard from "./EmployerDashboard";
import EmployeeJobListing from "./EmployeeJobListing";
import JobApplications from "./JobApplications";
import Profile from "./Profile";
import JobSeekerDashboard from "./JobSeekerDashboard";
import JobSeekerProfile from "./JobSeekerProfile";
import EditJobApplicationForm from "./EditJobApplicationForm";
import EditJobApplication from "./EditJobApplication";
import JobStatus from "./JobStatus";
import Review from "./Review";
import AdminDashboard from "./AdminDashboard";
import DeleteJobSeeker from "./DeleteJobSeeker";







import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/JobSeekerLogin" element={<JobSeekerLogin />} />
        <Route path="/JobSeekersSignUp" element={<JobSeekersSignUp />} />
        <Route path="/JobSeekerForgotPassword" element={<JobSeekerForgotPassword />} />
        <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
        <Route path="/EmployerSignUp" element={<EmployerSignUp />} />
        <Route path="/EmployeeForgotPassword" element={<EmployeeForgotPassword />} />
        <Route path="/JobApplicationForm" element={<JobApplicationForm />} />
        <Route path="/EmployeeAppForm" element={<EmployeeAppForm />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/JobListings" element={<JobListings />} />
        <Route path="/edit-job/:id" element={<EditJobForm />} />
        <Route path="/EmployerDashboard" element={<EmployerDashboard />} />
        <Route path="/EmployeeJobListing" element={<EmployeeJobListing />} />
        <Route path="/JobApplications" element={<JobApplications />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/JobSeekerDashboard" element={<JobSeekerDashboard />} />
        <Route path="/JobSeekerProfile" element={<JobSeekerProfile />} />
        <Route path="/edit-job/:id" element={<EditJobForm />} />
        <Route path="/edit-job-application/:id" element={<EditJobApplicationForm />} />
        <Route path="/edit-job-application/:id" element={<EditJobApplication />} />
        <Route path="/JobStatus" element={<JobStatus />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/DeleteJobSeeker" element={<DeleteJobSeeker />} />
      
      
       
       
     

      

       
      </Routes>
    </Router>
  );
};

export default App;
