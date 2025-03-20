import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, remove } from 'firebase/database';
import { realtimeDB } from './firebase';

function DeleteEmployeeForm() {
  const { id } = useParams(); // Get job ID from URL
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      const formRef = ref(realtimeDB, `employeeForms/${id}`);
      await remove(formRef);

      setIsDeleted(true);
      alert('Form deleted successfully!');

      // Redirect after deletion
      setTimeout(() => navigate('/job-listings'), 1500);
    } catch (error) {
      console.error('Error deleting form:', error);
      alert('There was an error deleting the form.');
    }
  };

  return (
    <div className="delete-container">
      {isDeleted ? (
        <h1>Form Deleted</h1>
      ) : (
        <div>
          <h1>Are you sure you want to delete this form?</h1>
          <button onClick={handleDelete} className="delete-button">
            Yes, Delete
          </button>
          <button onClick={() => navigate('/job-listings')} className="cancel-button">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteEmployeeForm;
