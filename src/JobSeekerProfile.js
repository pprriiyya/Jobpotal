import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { realtimeDB } from './firebase';
import './Profile.css';

function JobSeekerProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [resume, setResume] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: '',
    email: '',
    skills: '',
    experience: ''
  });

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        const userProfileRef = ref(realtimeDB, `userProfile/${user.uid}`);
        get(userProfileRef).then((snapshot) => {
          if (snapshot.exists()) {
            setUserProfile(snapshot.val());
            setEditedProfile(snapshot.val()); // Initialize edited profile with current values
          }
        });
      } else {
        setUserId(null);
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
      const resumeRef = ref(realtimeDB, `userProfile/${userId}/resume`);
      set(resumeRef, file.name);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const userProfileRef = ref(realtimeDB, `userProfile/${userId}`);
    set(userProfileRef, editedProfile).then(() => {
      setUserProfile(editedProfile);
      setIsEditing(false);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedProfile((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Job Seeker Profile</h2>
      {userProfile ? (
        <div className="profile-content">
          {isEditing ? (
            <div>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Skills:
                <input
                  type="text"
                  name="skills"
                  value={editedProfile.skills}
                  onChange={handleChange}
                />
              </label>
              <label>
                Experience:
                <input
                  type="text"
                  name="experience"
                  value={editedProfile.experience}
                  onChange={handleChange}
                />
              </label>
              <div className="resume-upload">
                <label>Upload Resume:</label>
                <input type="file" onChange={handleResumeUpload} />
                {resume && <p>Uploaded: {resume.name}</p>}
              </div>
              <button onClick={handleSaveClick}>Save</button>
            </div>
          ) : (
            <div>
              <p><strong>Name:</strong> {userProfile.name}</p>
              <p><strong>Email:</strong> {userProfile.email}</p>
              <p><strong>Skills:</strong> {userProfile.skills || 'Not provided'}</p>
              <p><strong>Experience:</strong> {userProfile.experience || 'Not provided'}</p>
              <div className="resume-upload">
                <label>Resume:</label>
                <p>{userProfile.resume || 'No resume uploaded'}</p>
              </div>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default JobSeekerProfile;
