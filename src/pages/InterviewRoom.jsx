import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const InterviewRoom = () => {
  const interviews = [
    {
      id: 1,
      candidate: "Rajesh",
      job: "Frontend Developer",
      date: "2025-07-10",
      time: "10:00 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      candidate: "Jane Smith",
      job: "Backend Developer",
      date: "2025-07-12",
      time: "2:00 PM",
      status: "Scheduled",
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold mb-4">Interview Room</h1>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Candidate</th>
                <th className="py-2 px-4">Job</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview) => (
                <tr key={interview.id} className="border-b">
                  <td className="py-2 px-4">{interview.id}</td>
                  <td className="py-2 px-4">{interview.candidate}</td>
                  <td className="py-2 px-4">{interview.job}</td>
                  <td className="py-2 px-4">{interview.date}</td>
                  <td className="py-2 px-4">{interview.time}</td>
                  <td className="py-2 px-4">{interview.status}</td>
                  <td className="py-2 px-4">
                    <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                      Join
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InterviewRoom;
