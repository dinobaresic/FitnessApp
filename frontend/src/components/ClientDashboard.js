import React, { useEffect, useState } from "react";
import axios from "axios";

const ClientDashboard = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/client/workouts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setWorkouts(response.data))
      .catch((error) => console.error("Error fetching workouts:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-purple-600 mb-6">
        Client Dashboard
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Today's Workout</h2>
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <div key={index} className="p-4 border-b">
              <h3 className="text-lg font-medium">{workout.title}</h3>
              <p className="text-gray-700">{workout.description}</p>
            </div>
          ))
        ) : (
          <p>No workouts assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
