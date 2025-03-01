import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CoachDashboard = () => {
  const [clients, setClients] = useState([]);
  const [username, setUsername] = useState("");
  const [pendingRequests, setPendingRequests] = useState([]);
  const [userId, setuserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    axios
      .get("http://localhost:8080/coach/clients", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  const sendRequest = () => {
    axios
        .post(`http://localhost:8080/coach-requests/send?coachId=${userId}&clientIdentifier=${username}`, null, {
      headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
        })
            .then(() => alert("Request Sent"))
            .catch((error) => console.error("Error sending request:", error));
  };



  useEffect(() => {
    axios
      .get("http://localhost:8080/coach/pending-requests", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setPendingRequests(response.data))
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Coach Dashboard
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Find Client</h2>
        <input
          type="text"
          placeholder="Enter client username/email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded"
        />
        <button 
          onClick={sendRequest} 
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Send Request
        </button>
      </div>

      <div className="bg-white p-6 mt-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Clients</h2>
        <ul>
          {clients.length > 0 ? (
            clients.map((client) => (
              <li key={client.id} className="flex justify-between p-4 border-b">
                <span className="text-lg font-medium">{client.name}</span>
                <div>
                  <Link to={`/chat/${client.id}`} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
                    Chat
                  </Link>
                  <Link to={`/assign-workout/${client.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md">
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
