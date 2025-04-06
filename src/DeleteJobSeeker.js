import React, { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { realtimeDB } from './firebase';
import './EditJobApplicationForm.css'; // Reuse the same CSS for consistent style

function DeleteJobSeeker() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch job applications from Firebase
  useEffect(() => {
    const applicationsRef = ref(realtimeDB, 'jobApplications');

    onValue(applicationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const applicationsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setApplications(applicationsArray);
      } else {
        setApplications([]);
      }
      setLoading(false);
    });
  }, []);

  // Handle Delete functionality
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this application?");
    
    if (confirmDelete) {
      const applicationRef = ref(realtimeDB, `jobApplications/${id}`);
      remove(applicationRef)
        .then(() => {
          alert('Application deleted successfully!');
          setApplications(applications.filter((app) => app.id !== id));
        })
        .catch((error) => {
          alert('Error deleting application: ' + error.message);
        });
    } else {
      alert('Deletion canceled.');
    }
  };

  return (
    <div className="submitted-applications">
      <h2>Delete Job Seeker Applications</h2>

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app.id} className="application-card">
              <p><strong>Name:</strong> {app.firstName} {app.lastName}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phone}</p>
              <p><strong>Position Applied:</strong> {app.position}</p>
              <p><strong>Job Type:</strong> {app.jobType}</p>
              <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
              {app.resume && <p><strong>Resume:</strong> <a href={app.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>}
              <button onClick={() => handleDelete(app.id)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeleteJobSeeker;
