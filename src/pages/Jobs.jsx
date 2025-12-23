import React from "react";
import Navbar from "../components/layout/Navbar";

const Jobs = () => {
  const jobs = [
    { id: 1, title: "Frontend Developer", location: "Remote", type: "Full-time", status: "Open" },
    { id: 2, title: "Backend Developer", location: "Bangalore", type: "Contract", status: "Closed" },
    { id: 3, title: "AI Engineer", location: "Hyderabad", type: "Full-time", status: "Open" },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold mb-4">Jobs Posted</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Location</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b">
                  <td className="py-2 px-4">{job.id}</td>
                  <td className="py-2 px-4">{job.title}</td>
                  <td className="py-2 px-4">{job.location}</td>
                  <td className="py-2 px-4">{job.type}</td>
                  <td className="py-2 px-4">{job.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
