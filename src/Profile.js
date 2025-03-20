import React, { useState } from 'react';
import { ref, update } from 'firebase/database';
import { realtimeDB } from './firebase'; // Firebase setup
import './Profile.css';


function Profile({ userProfile, userId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newProfileData, setNewProfileData] = useState(userProfile);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (userId) {
      const userRef = ref(realtimeDB, `userProfiles/${userId}`);
      update(userRef, newProfileData)
        .then(() => {
          setIsEditing(false);
          alert('Profile updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile');
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>

      {isEditing ? (
        <div className="edit-profile-form">
          <input
            type="text"
            name="firstName"
            value={newProfileData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={newProfileData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            value={newProfileData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="phoneNumber"
            value={newProfileData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <button onClick={handleSave} className="save-button">
            Save Changes
          </button>
        </div>
      ) : (
        <div className="profile-details">
          <p><strong>First Name:</strong> {userProfile.firstName}</p>
          <p><strong>Last Name:</strong> {userProfile.lastName}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>Phone Number:</strong> {userProfile.phoneNumber}</p>
          <button onClick={handleEdit} className="edit-button">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
