import React from "react";

const Profile = () => {
  const user = {
    name: "Ashish Kumar",
    email: "ashish.kumar@gmail.com",
    location: "India",
    role: "Admin",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white shadow rounded p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-blue-700 text-center">
          Your Profile
        </h1>

        <div className="space-y-4 text-lg text-gray-700">
          <p>👤 <span className="font-medium">Name:</span> {user.name}</p>
          <p>📧 <span className="font-medium">Email:</span> {user.email}</p>
          <p>📍 <span className="font-medium">Location:</span> {user.location}</p>
          <p>📝 <span className="font-medium">Role:</span> {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
