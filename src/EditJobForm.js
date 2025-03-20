import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get, update } from "firebase/database";
import { realtimeDB } from "./firebase";
import "./EditJobForm.css";

function EditJobForm() {
  const { id } = useParams(); // Get job ID from URL
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    email: "",
    phoneNumber: "",
    city: "",
  });

  useEffect(() => {
    const jobRef = ref(realtimeDB, `employeeForms/${id}`);

    // Fetch job data from Firebase
    get(jobRef).then((snapshot) => {
      if (snapshot.exists()) {
        setJobData(snapshot.val());
      } else {
        alert("Job not found!");
        navigate("/JobListings");
      }
    });
  }, [id, navigate]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobRef = ref(realtimeDB, `employeeForms/${id}`);

    try {
      await update(jobRef, jobData);
      alert("Job updated successfully!");
      navigate("/JobListings"); // Redirect to job listings
    } catch (error) {
      alert("Error updating job: " + error.message);
    }
  };

  return (
    <div className="edit-job-container">
      <h2>Edit Job Listing</h2>
      <form onSubmit={handleSubmit} className="edit-job-form">
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={jobData.firstName}
          onChange={handleChange}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={jobData.lastName}
          onChange={handleChange}
          required
        />

        <label>Position:</label>
        <input
          type="text"
          name="position"
          value={jobData.position}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={jobData.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={jobData.phoneNumber}
          onChange={handleChange}
          required
        />

        <label>City:</label>
        <input
          type="text"
          name="city"
          value={jobData.city}
          onChange={handleChange}
          required
        />

        <button type="submit" className="save-button">Save Changes</button>
        <button type="button" className="cancel-button" onClick={() => navigate("/JobListings")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditJobForm;
