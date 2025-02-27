import React from 'react';
import { Link } from 'react-router-dom';

const WhyChooseSection = () => {
    return(

        <div className="relative bg-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose FitConnect?</h2>
          <p className="text-lg text-gray-600 mb-12">Here’s why thousands of fitness enthusiasts choose FitConnect for their fitness journey.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           
            <div className="p-6 bg-white rounded-lg shadow-md  hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Easy to Use</h3>
              <p className="text-gray-600">FitConnect is designed to be intuitive, so you can focus on your fitness goals without worrying about tech issues.</p>
            </div>
            
            
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Track Progress</h3>
              <p className="text-gray-600">With real-time progress tracking, you can easily monitor your fitness journey and adjust your routine for better results.</p>
            </div>
            
          
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">24/7 Support</h3>
              <p className="text-gray-600">Our support team is available around the clock to help you with any questions or issues you may face.</p>
            </div>
          </div>
          
        
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">What Our Users Say</h3>
            <div className="flex justify-center">
              <blockquote className="text-lg italic text-gray-700 max-w-xl">
                "FitConnect has completely transformed my fitness experience. It's easy to use, helps me stay motivated, and keeps me on track with my goals!"
                <footer className="mt-4 text-gray-600">- Jane Doe, Fitness Enthusiast</footer>
              </blockquote>
            </div>
          </div>
          
        
          <div className="mt-12">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-full transition duration-300">
                <Link to="/signup" className="text-white">
              Join Now
                </Link>
            </button>
          </div>
        </div>
      </div>

    );

};

export default WhyChooseSection;