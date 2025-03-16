import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import the Firestore database

import './JobApplicationForm.css'; // Import the CSS file

function JobApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    startDate: '',
    interviewDate: '',
    coverLetter: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save form data to Firestore
      await addDoc(collection(db, 'jobApplications'), formData);
      console.log('Form data submitted:', formData);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting form data:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="job-application-form">
      <h2>Job Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Applied Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Earliest Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="interviewDate">Preferred Interview Date:</label>
          <input
            type="date"
            id="interviewDate"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="coverLetter">Cover Letter:</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="resume">Upload Resume:</label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobType">Job Type:</label>
          <select>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="FreeLancer">FreeLancer</option>
          </select>
          </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default JobApplicationForm;
