import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setVisible(true); // Show when scrolling up
      } else if (currentScrollY > lastScrollY) {
        setVisible(false); // Hide when scrolling down
      }

      setLastScrollY(currentScrollY);
    };

    // Check if user is logged in
    const checkLoginStatus = () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Check login status on component mount
    checkLoginStatus();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    // Clear localStorage and update state
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav
      className={`relative top-0 w-full p-6 bg-gray-800 text-white flex justify-between items-center transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="text-2xl font-bold">
        <Link to="/welcome" className="mr-4 hover:text-gray-400">
          FitConnect
        </Link>
      </div>
      <div className="space-x-4">
        {!isLoggedIn ? (
          <>
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
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-blue-900 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
