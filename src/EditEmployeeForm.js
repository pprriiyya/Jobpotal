import React, { useState, useEffect } from 'react';
import { realtimeDB } from './firebase'; // Your Firebase import
import { ref, get, update } from 'firebase/database'; // Firebase functions
import './EmployeeAppForm.css'; // Your CSS

function EditEmployeeForm({ selectedFormId }) {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    // other fields...
  });

  useEffect(() => {
    // Fetch existing form data from Firebase
    const fetchFormData = async () => {
      const formRef = ref(realtimeDB, `employeeForms/${selectedFormId}`);
      const snapshot = await get(formRef);
      if (snapshot.exists()) {
        setFormData(snapshot.val());
      } else {
        alert('Form not found!');
      }
    };

    if (selectedFormId) {
      fetchFormData();
    }
  }, [selectedFormId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formRef = ref(realtimeDB, `employeeForms/${selectedFormId}`);
      await update(formRef, formData);

      alert('Form updated successfully!');
    } catch (error) {
      console.error('Error updating form:', error);
      alert('There was an error updating the form.');
    }
  };

  return (
    <div className="form-container">
      <h1>Edit Employee Form</h1>
      <form onSubmit={handleSubmit} className="employee-form">
        {/* Same form fields as in EmployeeAppForm */}
        <div className="form-group">
          <p className="form-label">First Name</p>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        {/* Repeat for other fields like last name, email, etc. */}
        <button type="submit" className="submit-button">
          Update Form
        </button>
      </form>
    </div>
  );
}

export default EditEmployeeForm;
