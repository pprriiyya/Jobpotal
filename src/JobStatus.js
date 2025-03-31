
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { realtimeDB } from './firebase';
import './JobStatus.css';

function JobStatus() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="job-status">
      <h2>Job Status</h2>

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications available.</p>
      ) : (
        applications.map((app) => (
          <div key={app.id} className="application-cardd">
            <h3>
              {app.firstName} {app.lastName}
            </h3>
            <p>Email: {app.email}</p>
            <p>Phone: {app.phone}</p>
            <p>Position: {app.position}</p>
            <p>Job Type: {app.jobType}</p>
            <p>Status: {app.status || 'Pending'}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default JobStatus;




