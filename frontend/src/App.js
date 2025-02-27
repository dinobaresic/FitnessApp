import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import './styles/output.css';  // Ovdje importiraj output.css umjesto style.css

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="p-4 bg-gray-800 text-white">
          <Link to="/signup" className="mr-4">Sign Up</Link>
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