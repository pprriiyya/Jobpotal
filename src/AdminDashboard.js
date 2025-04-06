import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { realtimeDB } from './firebase'; // Firebase setup
import './Dashboard.css';
import DeleteEmployee from './DeleteEmployee'; // Import DeleteEmployee component
import DeleteJobSeeker from './DeleteJobSeeker'; // Import DeleteJobSeeker component


function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('');
  const [userId, setUserId] = useState(null); // Define state for userId
  const [userProfile, setUserProfile] = useState(null); // Define state for userProfile
  const navigate = useNavigate(); // Initialize navigate function

  const auth = getAuth();

  // Fetch user profile when logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set userId to the logged-in user's UID
        const userProfileRef = ref(realtimeDB, `userProfiles/${user.uid}`);
        get(userProfileRef).then((snapshot) => {
          if (snapshot.exists()) {
            setUserProfile(snapshot.val()); // Set user profile data
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
      navigate('/'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar with buttons */}
      <div className="sidebar">
        <button onClick={() => handleButtonClick('deleteEmployee')} className="sidebar-button">
          Delete Employee
        </button>
        <button onClick={() => handleButtonClick('DeleteJobSeeker')} className="sidebar-button">
          Delete JobSeeker
        </button>

        <button onClick={handleLogout} className="sidebar-button logout-button">
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-welcome" >Welcome </p>



        
        
        {activeSection === 'deleteEmployee' && <DeleteEmployee />}
        {activeSection === 'DeleteJobSeeker' && <DeleteJobSeeker />}
      </div>
    </div>
  );
}

export default AdminDashboard;
