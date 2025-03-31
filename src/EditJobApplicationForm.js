import React, { useState, useEffect } from 'react';
import { ref, onValue, remove, set } from 'firebase/database'; // Import remove along with other Firebase functions
import { realtimeDB } from './firebase'; // Import Realtime Database
import { useNavigate } from 'react-router-dom'; // For navigation to the Edit form
import './EditJobApplicationForm.css'; // Import the CSS file

function EditJobApplicationForm() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Fetch job applications from Firebase Realtime Database
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

  // Handle Edit functionality
  const handleEdit = (app) => {
    setEditMode(true); // Set edit mode to true
    setCurrentApplication(app); // Set the current application to be edited
  };

  // Handle form field changes for the selected application
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentApplication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle saving the updated application to Firebase
  const handleSave = () => {
    if (currentApplication) {
      const applicationRef = ref(realtimeDB, `jobApplications/${currentApplication.id}`);
      set(applicationRef, currentApplication)
        .then(() => {
          alert('Application updated successfully!');
          setEditMode(false); // Close edit mode
          setCurrentApplication(null); // Reset current application
        })
        .catch((error) => {
          alert('Error updating application: ' + error.message);
        });
    }
  };

  // If in edit mode, show the edit form
  if (editMode && currentApplication) {
    return (
      <div className="edit-application-form">
        <h2>Edit Job Application</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="firstName"
              value={currentApplication.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              value={currentApplication.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={currentApplication.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={currentApplication.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Position Applied:</label>
            <input
              type="text"
              name="position"
              value={currentApplication.position}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Job Type:</label>
            <input
              type="text"
              name="jobType"
              value={currentApplication.jobType}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Cover Letter:</label>
            <textarea
              name="coverLetter"
              value={currentApplication.coverLetter}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <button type="button" onClick={handleSave}>Save Changes</button>
            <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="submitted-applications">
      <h2>Submitted Job Applications</h2>
      
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
              <button onClick={() => handleEdit(app)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(app.id)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EditJobApplicationForm;
