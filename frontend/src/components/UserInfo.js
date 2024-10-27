import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserInfo.css';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({ username: '', bio: '', profilePicture: '' });
  const [newBio, setNewBio] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/user-info'); // Ensure this endpoint is correct
        setUserInfo(response.data);
        setNewBio(response.data.bio);
      } catch (error) {
        console.error('Error fetching user info:', error);
        alert('Could not fetch user information. Please try again later.');
      }
    };
    fetchUserInfo();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', userInfo.username);
    formData.append('bio', newBio);
    if (newProfilePicture) {
      formData.append('profilePicture', newProfilePicture);
    }

    try {
      await axios.put('/api/user-info', formData); // Ensure this endpoint is correct
      alert('User information updated!');
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('Failed to update user information. Please try again.');
    }
  };

  return (
    <div className="user-info">
      <h2>User Information</h2>
      <img src={userInfo.profilePicture || 'default-profile.png'} alt="Profile" className="profile-pic" />
      <form onSubmit={handleUpdate}>
        <label>
          Username:
          <input type="text" value={userInfo.username} readOnly />
        </label>
        <label>
          Bio:
          <textarea value={newBio} onChange={(e) => setNewBio(e.target.value)} />
        </label>
        <label>
          Profile Picture:
          <input type="file" accept="image/*" onChange={(e) => setNewProfilePicture(e.target.files[0])} />
        </label>
        <button type="submit">Update Info</button>
      </form>
    </div>
  );
};

export default UserInfo;
