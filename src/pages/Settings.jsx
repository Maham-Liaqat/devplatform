import React, { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    name: "Ashish Kumar",
    email: "ashish.kumar@gmail.com",
    password: "",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings saved:", settings);
    alert("Settings updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-4 text-blue-700 text-center">
          Settings
        </h1>

        <label className="block mb-2 font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          value={settings.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          required
        />

        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={settings.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          required
        />

        <label className="block mb-2 font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={settings.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter new password"
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Enable Notifications</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
