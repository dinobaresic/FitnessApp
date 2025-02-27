import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Navbar from "./components/Navbar";
import LandingPage from './components/LandingPage';
import './styles/output.css';  // Ovdje importiraj output.css umjesto style.css

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />

        <Routes>
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;