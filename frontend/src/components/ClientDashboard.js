import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatPopup from "./ChatPopup";
import { Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";


const ClientDashboard = () => {
  
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(""); // Error state
  const [userId, setuserId] = useState(localStorage.getItem("userId"));
  const [chatCoach, setChatCoach] = useState(null);
  const [coaches, setCoaches] = useState([]);
  const [workoutVideos, setWorkoutVideos] = useState([]);

  useEffect(() => {

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    axios
        .get(`http://localhost:8080/coach-requests/client/requests`, {
            params: {
                clientId: userId,
            },
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
            setRequests(response.data);         
        })
        .catch((error) => {
            console.error("Error fetching requests:", error);
            setError("Error fetching requests. Please try again later.");
        });
 
        axios
      .get(`http://localhost:8080/requests/client/coaches/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCoaches(response.data))
      .catch((error) => console.error("Error fetching coach:", error));


    axios.get(`http://localhost:8080/workout-video/client/${userId}`, {
      headers
      : { Authorization: `Bearer ${token}` },
    })
    .then((response) => setWorkoutVideos(response.data))
    .catch((error) => console.error("Error fetching workouts:", error));

}, [userId]); 


const openChat = (coachId, coachName) => {
  setChatCoach({ coachId, coachName });
};

const closeChat = () => {
  setChatCoach(null);
};
 
const handleRequest = (requestId, action) => {
  axios
      .post(
          `http://localhost:8080/coach-requests/${requestId}/respond?action=${action}`, 
          {}, // No body, as action is in query params
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => {
          console.log(`Request ${requestId} ${action}ed successfully.`);

          // Refresh the request list after responding
          axios
              .get(`http://localhost:8080/coach-requests/client/requests`, {
                  params: { clientId: userId },
                  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
              })
              .then((response) => setRequests(response.data))
              .catch((error) => {
                  console.error("Error fetching requests after response:", error);
                  setError("Error fetching requests after response.");
              });
      })
      .catch((error) => {
          console.error(`Error handling request (${action}):`, error);
          setError("Error processing the request, please try again.");
      });
};

  return (

    <div className="min-h-screen  bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-purple-600 mb-6">
        Client Dashboard
      </h1>

      {/* Incoming Requests */}
      <div className="bg-white p-10 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Coach Requests</h2>
        {requests.length > 0 ? (
          requests.map((req) => (
          <div key={req.id} className="p-4 border-b flex justify-between items-center">
               <span className="text-lg font-medium">Request ID: {req.id}</span>
               <span className="text-gray-600">Coach ID: {req.clientId || "Unknown" }</span>
               <span className="text-gray-600">Time: {req.requestDate}</span>
 
              <button
              onClick={() => handleRequest(req.id, "accept")}
              className="bg-green-500 text-black px-4 py-2 rounded-md mr-2 w-32" // Added w-32 to give fixed width
              >
                Accept
                </button>
                <button
               onClick={() => handleRequest(req.id, "decline")}
              className="bg-red-500 text-black px-4 py-2 rounded-md w-32" // Added w-32 to give fixed width
                  >
                   Decline
            </button>
              
            </div>
          ))
        ) : (
          <p>No pending requests.</p>
        )}
      </div>

       {/* Coach List for Chat */}
       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Chat with Your Coaches</h2>
        {coaches.length > 0 ? (
          coaches.map((coach) => (
            <div
              key={coach.id}
              className="p-4 border-b flex justify-between items-center"
            >
              <span className="text-lg font-medium">{coach.username}</span>
              <Button
                onClick={() => openChat(coach.id, coach.username)}
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
              >
                Chat
              </Button>
            </div>
          ))
        ) : (
          <p>No assigned coaches yet.</p>
        )}
      </div>

      {/* Workouts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Today's Workout</h2>

      {workoutVideos.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          effect="coverflow"
          centeredSlides={true}
          loop={true}
          className="mySwiper"
        >
          {workoutVideos.map((video) => (
            <SwiperSlide key={video.id} className="flex justify-center">
              <div className="p-4 bg-gray-100 rounded-lg shadow-lg max-w-lg">
                <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-600 mb-2">{video.description}</p>
                <video width="100%" controls className="rounded-lg">
                  <source
                    src={`http://localhost:8080/workout-video/get/${video.id}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No workouts assigned yet.</p>
      )}
    </div>

      

       {/* Render ChatPopup when chatCoach is set */}
      {chatCoach && (
        <ChatPopup
          clientId={chatCoach.coachId}
          clientName={chatCoach.coachName}
          isVisible={!!chatCoach}
          onClose={closeChat}
        />
      )}

      
    </div>

    
  );
};

export default ClientDashboard;
