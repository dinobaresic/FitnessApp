import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox } from "@mui/material";
import Footer from "./Footer";

const CoachDashboard = () => {
  const [clients, setClients] = useState([]);
  const [username, setUsername] = useState("");
  const [pendingRequests, setPendingRequests] = useState([]);
  const [userId, setuserId] = useState(localStorage.getItem("userId"));
  const [selectedClient, setSelectedClient] = useState(new Set());

 

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

  const handleSelect = (clientId) => {
    setSelectedClient((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.has(clientId) ? newSelected.delete(clientId) : newSelected.add(clientId);
      return newSelected;
    });
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  
    if (!userId) {
      console.error("User is not authenticated or userId is missing.");
      return;
    }
  
    axios
      .get(`http://localhost:8080/requests/coach/clients/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);
  


/*
  useEffect(() => {
    axios
      .get("http://localhost:8080/coach/pending-requests", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setPendingRequests(response.data))
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);
*/

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Coach Dashboard
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Connect with Client</h2>
        <input
          type="text"
          placeholder="Enter client username/email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
           className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
       <Button 
  variant="contained" 
  color="primary" 
  onClick={sendRequest} 
  style={{ marginLeft: "10px", marginBottom: "3px", padding: "10px 20px", fontSize: "14px" }}
>
  Send Request
</Button>
      </div>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Select</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell style={{width: "200px", textAlign: "center"}}><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
             <TableRow 
             key={client.id} 
             onClick={() => handleSelect(client.id)}
             style={{ cursor: "pointer", backgroundColor: selectedClient.has(client.id) ? "#e3f2fd" : "inherit" }}
           >
            <TableCell>
                  <Checkbox 
                    checked={selectedClient.has(client.id)} 
                    onChange={() => handleSelect(client.id)}
                    onClick={(e) => e.stopPropagation()} // Stop row click from triggering
                  />
                </TableCell>
              <TableCell>{client.username}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" style={{ marginRight: "10px" }}>
                  Chat
                </Button>
                <Button variant="contained" color="secondary" style={{ marginTop: "10px" }}>
                  Assign Workout
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </div>
  
  );
};

export default CoachDashboard;
