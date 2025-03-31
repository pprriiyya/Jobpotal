import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import JobSeekerProfile from './JobSeekerProfile';
import JobApplicationForm from './JobApplicationForm';

import EditJobApplicationForm from './EditJobApplicationForm';
import JobStatus from './JobStatus';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { realtimeDB } from './firebase';
import './Dashboard.css';

function JobSeekerDashboard() {
  const [activeSection, setActiveSection] = useState('JobListings'); // Default section updated to Job Listings
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        const userProfileRef = ref(realtimeDB, `userProfiles/${user.uid}`);
        get(userProfileRef).then((snapshot) => {
          if (snapshot.exists()) {
            setUserProfile(snapshot.val());
          }
        });
      } else {
        setUserId(null);
        setUserProfile(null);
        navigate('/JobSeekerLogin'); // Redirect to login page if not logged in
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
      navigate('/JobSeekerLogin'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <button onClick={() => handleButtonClick('EditJobApplicationForm')} className="sidebar-button">
          Edit Application
        </button>
        <button onClick={() => handleButtonClick('JobSeekerProfile')} className="sidebar-button">
          Profile
        </button>
        <button onClick={() => handleButtonClick('JobApplicationForm')} className="sidebar-button">
          Apply for Jobs
        </button>
        <button onClick={() => handleButtonClick('JobStatus')} className="sidebar-button">
          Job Status
        </button>
        <button onClick={handleLogout} className="sidebar-button logout-button">
          Logout
        </button>
      </div>

      <div className="main-content">
        <h1 className="dashboard-title">Job Seeker Dashboard</h1>

        {/* Display the active section based on button click */}
        {activeSection === 'JobSeekerProfile' && <JobSeekerProfile profile={userProfile} userId={userId} />}
        {activeSection === 'JobApplicationForm' && <JobApplicationForm />}
        {activeSection === 'EditJobApplicationForm' && <EditJobApplicationForm />}
        {activeSection === 'JobStatus' && <JobStatus />}
      </div>
    </div>
  );
}

export default JobSeekerDashboard;
