import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox, TextField} from "@mui/material";
import ChatPopup from "./ChatPopup";

const CoachDashboard = () => {
  const [clients, setClients] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [selectedClient, setSelectedClient] = useState(new Set());
  const [chatClient, setChatClient] = useState(null); // Tracks which client to chat with
  // State for Video Upload
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const handleVideoChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!videoFile || !title || !description || selectedClient.size === 0) {
      alert("Please select a video, title, description, and at least one client.");
      return;
    }

    selectedClient.forEach((clientId) => {
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("coachId", localStorage.getItem("userId"));
      formData.append("clientId", clientId);

      axios
        .post("http://localhost:8080/workout-video/upload", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => alert("Video uploaded successfully!"))
        .catch((error) => console.error("Error uploading video:", error));
    });

    // Reset fields after upload
    setVideoFile(null);
    setTitle("");
    setDescription("");
  };


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

  const openChat = (clientId, clientName) => {
    setChatClient({ clientId, clientName }); // Set selected client for chat
  };

  const closeChat = () => {
    setChatClient(null); // Close chat popup
  };

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
              <TableCell style={{ width: "200px", textAlign: "center" }}><strong>Actions</strong></TableCell>
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
                  <Button
                    onClick={() => openChat(client.id, client.username)}
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "10px" }}
                  >
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

       {/* Video Upload Section */}
       <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Upload Workout Video</h2>
        <TextField
          label="Video Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <input type="file" accept="video/*" onChange={handleVideoChange} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          style={{ marginTop: "10px" }}
        >
          Upload Video
        </Button>
      </div>

      {/* Render ChatPopup when chatClient is set */}
      {chatClient && (
        <ChatPopup
          clientId={chatClient.clientId}
          clientName={chatClient.clientName}
          isVisible={!!chatClient}
          onClose={closeChat}
        />
      )}
    </div>
  );
};

export default CoachDashboard;