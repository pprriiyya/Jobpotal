import React, { useState, useEffect } from 'react';
import EmployeeJobListing from './EmployeeJobListing';
import Profile from './Profile'; // Import the profile component
import EmployeeAppForm from './EmployeeAppForm';
import JobApplications from './JobApplications'; // Import job applications component
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { realtimeDB } from './firebase'; // Firebase setup
import './Dashboard.css';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('EmployeeJobListings');
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);

  const auth = getAuth();

  // Fetch user profile when logged in
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
      const userProfileRef = ref(realtimeDB, `userProfiles/${currentUser.uid}`);
      get(userProfileRef).then((snapshot) => {
        if (snapshot.exists()) {
          setUserProfile(snapshot.val());
        }
      });
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, [auth]);

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar with buttons */}
      <div className="sidebar">
        <button onClick={() => handleButtonClick('EmployeeJobListings')} className="sidebar-button">
          Job Listings
        </button>
        <button onClick={() => handleButtonClick('profile')} className="sidebar-button">
          Profile
        </button>
        <button onClick={() => handleButtonClick('employeeForm')} className="sidebar-button">
          Employment Form
        </button>
        <button onClick={() => handleButtonClick('jobApplications')} className="sidebar-button">
          Job Applications
        </button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <h1 className="dashboard-title">Employer Dashboard</h1>
        
        {activeSection === 'EmployeeJobListings' && <EmployeeJobListing />}
        {activeSection === 'profile' && userProfile && <Profile userProfile={userProfile} userId={userId} />} 
        {activeSection === 'employeeForm' && <EmployeeAppForm />}
        {activeSection === 'jobApplications' && <JobApplications />}
      </div>
    </div>
  );
}

export default Dashboard;
