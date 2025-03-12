import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Navbar from "./components/Navbar";
import LandingPage from './components/LandingPage';
import CoachDashboard from './components/CoachDashboard';
import ClientDashboard from './components/ClientDashboard';
import Footer from './components/Footer';
import './styles/output.css';  // Ovdje importiraj output.css umjesto style.css

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />

        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/coach-dashboard" element={<CoachDashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;