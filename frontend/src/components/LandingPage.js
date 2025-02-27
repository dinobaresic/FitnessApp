import React from "react";
import { Link } from "react-router-dom";
import WhyChooseSection from "./WhyChooseSection";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center px-4 md:px-8 flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-5xl font-extrabold leading-tight mb-4">
          Welcome to FitConnect
        </h1>
        <p className="text-xl mb-6">
          Your fitness journey starts here. Join now and get started with personalized workouts and progress tracking.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-lg transition duration-200">
          <Link to="/signup" className="text-white">
              Sign Up
            </Link>
          </button>
          <button className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 rounded-full font-semibold text-lg transition duration-200">
            Learn More
          </button>
        </div>
      </div>
      
      <WhyChooseSection />

      <Footer />
      
    </div>

    

    
  );
};

export default LandingPage;