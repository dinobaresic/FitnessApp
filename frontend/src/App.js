// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import './styles/style.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </nav>

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
