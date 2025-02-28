import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CoachDashboard = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch the list of clients assigned to the coach
    axios
      .get("http://localhost:8080/api/coach/clients", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Coach Dashboard
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Clients</h2>
        <ul>
          {clients.length > 0 ? (
            clients.map((client) => (
              <li key={client.id} className="flex justify-between p-4 border-b">
                <span className="text-lg font-medium">{client.name}</span>
                <div>
                  <Link
                    to={`/chat/${client.id}`}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Chat
                  </Link>
                  <Link
                    to={`/assign-workout/${client.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Assign Workout
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <p>No clients assigned yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CoachDashboard;
