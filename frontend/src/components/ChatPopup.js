import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

const ChatPopup = ({ clientId, clientName, isVisible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (isVisible) {
      axios
        .get(`http://localhost:8080/chat/messages/between?senderId=${userId}&receiverId=${clientId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => setMessages(response.data))
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [isVisible, clientId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    axios
      .post(
        `http://localhost:8080/chat/messages/send`,
        null,
        {
          params: {
            senderId: userId,
            receiverId: clientId,
            content: newMessage,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data]); // Add the new message to the chat
        setNewMessage(""); // Clear the input field
      })
      .catch((error) => console.error("Error sending message:", error));
  };

  return (
    <Modal open={isVisible} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 500,
          maxHeight: 600,
          overflowY: "auto",
          borderRadius: 4,
        }}
      >
        <h2>Chat with {clientName}</h2>
        <div style={{ maxHeight: 400, overflowY: "auto", marginBottom: "16px" }}>
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.senderId == userId ? "right" : "left",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    backgroundColor: msg.senderId == userId ? "#e3f2fd" : "#c8e6c9",
                  }}
                >
                  {msg.content}
                </div>
                <div style={{ fontSize: "12px", color: "gray" }}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ChatPopup;