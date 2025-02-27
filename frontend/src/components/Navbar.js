import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-8 bg-gray-800 text-white flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/welcome" className="mr-4 hover:text-gray-400">
          FitConnect
        </Link>
      </div>
      <div className="space-x-4">
        <Link 
          to="/signup" 
          className="px-6 py-3 bg-blue-900 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition duration-200"
        >
          Sign Up
        </Link>
        <Link 
          to="/login" 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition duration-200"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
