import React, { useState, useEffect } from 'react';
import { ref, update, get } from 'firebase/database';
import { realtimeDB } from './firebase'; // Firebase setup
import './Profile.css';

function Profile({ userProfile, userId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    companyName: userProfile?.companyName || '',
    contactNumber: userProfile?.contactNumber || '',
  });

  // Fetch updated user profile data dynamically
  useEffect(() => {
    if (userId) {
      const userProfileRef = ref(realtimeDB, `userProfiles/${userId}`);
      get(userProfileRef).then((snapshot) => {
        if (snapshot.exists()) {
          setFormData(snapshot.val());
        }
      });
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (userId) {
      const userProfileRef = ref(realtimeDB, `userProfiles/${userId}`);
      update(userProfileRef, formData)
        .then(() => {
          console.log('Profile updated successfully');
          setIsEditing(false);
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
        });
    }
  };

  return (
    <div className="profile-container">
      <h2>Employer Profile</h2>
      {!isEditing ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Company Name:</strong> {formData.companyName}</p>
          <p><strong>Contact Number:</strong> {formData.contactNumber}</p>
          <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
        </div>
      ) : (
        <div className="edit-profile-form">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          
          <label>Company Name</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} />
          
          <label>Contact Number</label>
          <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} />
          
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
