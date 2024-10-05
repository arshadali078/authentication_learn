// src/components/ProfilePage.jsx
import React from 'react';
// Import the profile picture
import profilePic from '../assets/arshad2.jpg';

const ProfilePage = ({ user }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm">
            Edit Profile
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
            />
          </div>

          {/* User Details */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>

          {/* More User Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Username:</span>
              <span className="text-gray-600">{user.username}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Location:</span>
              <span className="text-gray-600">{user.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Phone:</span>
              <span className="text-gray-600">{user.phone}</span>
            </div>
          </div>

          {/* Logout Button */}
          <div className="text-center mt-6">
            <button className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example Usage (Pass user info as props)
const ExampleProfilePage = () => {
  const user = {
    name: 'Arsahd Ali',
    email: 'arsahd@gmail.com',
    profilePicture: profilePic, // Use the imported image
    username: 'alex heals',
    location: 'India, Rajkot',
    phone: '9525298873',
  };

  return <ProfilePage user={user} />;
};

export default ExampleProfilePage;
