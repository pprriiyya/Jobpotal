import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import EmployeeJobListing from './EmployeeJobListing';
import Profile from './Profile'; // Import the profile component
import EmployeeAppForm from './EmployeeAppForm';
import JobApplications from './JobApplications'; // Import job applications component
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { realtimeDB } from './firebase'; // Firebase setup
import './Dashboard.css';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('EmployeeJobListings');
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const auth = getAuth();

  // Fetch user profile when logged in
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
        navigate('/EmployerLogin'); // Redirect to login page if not logged in
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
      navigate('/EmployeeLogin'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar with buttons */}
      <div className="sidebar">
        <button onClick={() => handleButtonClick('EmployeeJobListings')} className="sidebar-button">
          Job Listings
        </button>
        <button onClick={() => handleButtonClick('Profile')} className="sidebar-button">
          Profile
        </button>
        <button onClick={() => handleButtonClick('employeeForm')} className="sidebar-button">
          Employment Form
        </button>
        <button onClick={() => handleButtonClick('jobApplications')} className="sidebar-button">
          Job Applications
        </button>
        <button onClick={handleLogout} className="sidebar-button logout-button">
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <h1 className="dashboard-title">Employer Dashboard</h1>
        
        {activeSection === 'EmployeeJobListings' && <EmployeeJobListing />}
        {activeSection === 'Profile' && Profile && <Profile Profile={userProfile} userId={userId} />} 
        {activeSection === 'employeeForm' && <EmployeeAppForm />}
        {activeSection === 'jobApplications' && <JobApplications />}
      </div>
    </div>
  );
}

export default Dashboard;
