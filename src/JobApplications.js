import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { realtimeDB } from './firebase';
import './JobApplications.css';

function JobApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const applicationsRef = ref(realtimeDB, 'jobApplications');
    
    onValue(applicationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const applicationsArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setApplications(applicationsArray);
      } else {
        setApplications([]);
      }
      setLoading(false);
    });
  }, []);

  const handleReject = (id) => {
    update(ref(realtimeDB, `jobApplications/${id}`), { status: 'Rejected' })
      .then(() => setNotification('Application Rejected'))
      .catch((error) => setNotification('Error rejecting application: ' + error.message));
  };

  const handleAccept = (id) => {
    update(ref(realtimeDB, `jobApplications/${id}`), { status: 'Accepted' })
      .then(() => setNotification('Application Accepted'))
      .catch((error) => setNotification('Error accepting application: ' + error.message));
  };



  const handleCheckResume = (url) => {
    setResumeUrl(url);
    setModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
    setResumeUrl(null);
  };

  return (
    <div className="job-applications">
      <h2>Job Applications</h2>
      
      {notification && <div className="notification">{notification}</div>}

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications available.</p>
      ) : (
        applications.map((app) => (
          <div key={app.id} className="application-card">
            <h3>{app.firstName} {app.lastName}</h3>
            <p>Email: {app.email}</p>
            <p>Phone: {app.phone}</p>
            <p>Position: {app.position}</p>
            <p>Job Type: {app.jobType}</p>
            <p>resume: {app.resume}</p>
            <p>Status: {app.status || 'Pending'}</p>
            <button onClick={() => handleAccept(app.id)} className="accept-btn">Accept Application</button>
            <button onClick={() => handleReject(app.id)} className="reject-btn">Reject Application</button>
            {app.resume && (
              <button onClick={() => handleCheckResume(app.resume)} className="resume-btn">View Resume</button>
            )}
          </div>
        ))
      )}

      {/* Modal to view the resume */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="modal-header">
              Resume
            </div>
            <div className="modal-body">
              {resumeUrl.endsWith('.pdf') ? (
                <embed src={resumeUrl} width="100%" height="500px" type="application/pdf" />
              ) : (
                <p>No preview available for this file.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobApplications;
