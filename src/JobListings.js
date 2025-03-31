import React, { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { realtimeDB } from './firebase'; // Firebase setup
import { useNavigate } from 'react-router-dom'; // For navigation
import './JobListings.css';

function JobListings() {
  const [jobListings, setJobListings] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // Fetch job listings and track logged-in user
  useEffect(() => {
    const jobRef = ref(realtimeDB, 'employeeForms');

    onValue(jobRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const jobList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setJobListings(jobList);
      }
    });

    // Track authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);

  const handleDelete = (id, ownerId) => {
    if (!userId) {
      alert("You must be logged in to delete a job.");
      navigate('/EmployerLogin'); // Redirect to login
      return;
    }

    if (userId !== ownerId) {
      alert("You can only delete your own job listings.");
      return;
    }

    const jobRef = ref(realtimeDB, `employeeForms/${id}`);
    remove(jobRef).then(() => {
      alert("Job deleted successfully!");
    }).catch((error) => {
      alert("Error deleting job: " + error.message);
    });
  };

  const handleEdit = (id) => {
    navigate(`/edit-job/${id}`);
  };

  return (
    <div className="job-listings-container">
          <header className="navbar">
        <div className="logo">
          <img src="logo for job portal.png" alt="Job Portal" />
          <h1>Job Portal</h1>
        </div>
        <nav>
          <ul className="nav-links">
           
            <a href="Home">Home</a> 
            <a href="About">About Us</a>
            <a href="JobseekerLogin">SignupforJobs </a> 
            <a href="EmployeeLogin">SignupforEmployer</a>
            <a href="ContactUs">ContactUs</a>
            <a href="JobListings">Job Listings</a>
            <a href ="Review">Reviews</a>
            <a href="/">Sign In</a>

          </ul>
        </nav>
      </header>
      <h1>Job Listings</h1>
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
              
              <div className="Apply">
                <a href="/JobApplicationForm">Apply Now</a>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="Home">Home</a> <br /> <hr />
            <a href="About">About Us</a><br /> <hr />
            <a href="JobseekerLogin">Signup for Jobs </a> <br /> <hr />
            <a href="EmployeeLogin">Signup for Employer</a><br /> <hr />
            <a href="ContactUs">Contact Us</a><br /><hr />
            <a href="JobListings">Job Listings</a><br /> <hr />
            <a href="Review">Reviews</a><br /> <hr />
            <a href="/">Sign In</a>
          </div>

          <div className="footer-quote">
            <p>
              "Your work is going to fill a large part of your life, and the only way 
              to be truly satisfied is to do what you believe is great work. 
              The only way to do great work is to love what you do. If you haven't found it yet, 
              keep looking. Don't settle."
            </p>
          </div>
        
          <div className="social-links">
            <p>SOCIAL LINKS</p>
            <a href="https://www.instagram.com/accounts/login/?hl=en" target="_blank" rel="noopener noreferrer">
              <img src="Instagram.jpg" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src="Facebook.png" alt="Facebook" />
            </a>
            <a href="https://twitter.com/?lang=en" target="_blank" rel="noopener noreferrer">
              <img src="download.png" alt="Twitter" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default JobListings;
