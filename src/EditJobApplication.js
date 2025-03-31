import React, { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database'; // Import necessary functions from Firebase
import { realtimeDB } from './firebase'; // Import Realtime Database
import { useParams, useNavigate } from 'react-router-dom'; // For URL params and navigation
import './EditJobApplication.css'; // Add this at the top of your EditJobApplication component



function EditJobApplication() {
  const { id } = useParams(); // Get the application ID from the URL
  const [application, setApplication] = useState(null); // State to hold the application data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // For navigation

  // Fetch the application data from Firebase
  useEffect(() => {
    const applicationRef = ref(realtimeDB, `jobApplications/${id}`);
    
    get(applicationRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setApplication(snapshot.val()); // Set the application data to the state
        } else {
          alert('Application not found');
        }
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        alert('Error fetching application: ' + error.message);
        setLoading(false);
      });
  }, [id]);

  // Handle form submission to update the application
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedApplication = {
      ...application, // Use the current state for fields that haven't been changed
    };

    const applicationRef = ref(realtimeDB, `jobApplications/${id}`);
    
    update(applicationRef, updatedApplication)
      .then(() => {
        alert('Application updated successfully!');
        navigate('/submitted-applications'); // Navigate back to the list of applications
      })
      .catch((error) => {
        alert('Error updating application: ' + error.message);
      });
  };

  // If loading or no data, show loading or error message
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!application) {
    return <p>Application not found.</p>;
  }

  return (
    <div className="edit-application">
      <h2>Edit Job Application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={application.firstName}
            onChange={(e) => setApplication({ ...application, firstName: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={application.lastName}
            onChange={(e) => setApplication({ ...application, lastName: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={application.email}
            onChange={(e) => setApplication({ ...application, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={application.phone}
            onChange={(e) => setApplication({ ...application, phone: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Position Applied:</label>
          <input
            type="text"
            value={application.position}
            onChange={(e) => setApplication({ ...application, position: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Job Type:</label>
          <input
            type="text"
            value={application.jobType}
            onChange={(e) => setApplication({ ...application, jobType: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Cover Letter:</label>
          <textarea
            value={application.coverLetter}
            onChange={(e) => setApplication({ ...application, coverLetter: e.target.value })}
            required
          />
        </div>
        <div>
          <button type="submit">Update Application</button>
        </div>
      </form>
    </div>
  );
}

export default EditJobApplication;
