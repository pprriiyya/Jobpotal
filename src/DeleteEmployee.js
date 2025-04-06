import React, { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { realtimeDB } from './firebase';
import { useNavigate } from 'react-router-dom';
import './JobListings.css';

function DeleteEmployee() {
  const [jobListings, setJobListings] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // Fetch job listings and track logged-in user
  useEffect(() => {
    const jobRef = ref(realtimeDB, 'employeeForms');

    const unsubscribeJobs = onValue(jobRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const jobList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setJobListings(jobList);
      } else {
        setJobListings([]);
      }
    });

    // Track authentication state
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });

    return () => {
      unsubscribeJobs();
      unsubscribeAuth();
    };
  }, []);

  // Ask for confirmation before deleting
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job listing?");
    if (!confirmDelete) return; // If the user clicks "No", stop here

    const jobRef = ref(realtimeDB, `employeeForms/${id}`);
    remove(jobRef)
      .then(() => {
        setJobListings((prevJobs) => prevJobs.filter((job) => job.id !== id)); // Remove from UI
        alert('Job deleted successfully!');
      })
      .catch((error) => {
        alert('Error deleting job: ' + error.message);
      });
  };

  return (
    <div className="job-listings-container">
      <h1></h1>

      {jobListings.length === 0 ? (
        <p>No job listings available.</p>
      ) : (
        <div className="job-list">
          {jobListings.map((application) => (
            <div key={application.id} className="job-box">
              <div className="job-header">
                <h3>{application.firstName} {application.lastName}</h3>
              </div>
              <div className="job-info">
                <p><strong>Position:</strong> {application.position}</p>
                <p><strong>Email:</strong> {application.email}</p>
                <p><strong>Phone Number:</strong> {application.phoneNumber}</p>
                <p><strong>City:</strong> {application.city}</p>
              </div>

              <div className="job-actions">
                <button className="delete-button" onClick={() => handleDelete(application.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeleteEmployee;
