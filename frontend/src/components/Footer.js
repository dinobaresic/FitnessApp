import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">FitConnect</h3>
            <p className="text-gray-400 mb-4">Your fitness journey starts here. Connect, track, and achieve your goals with FitConnect.</p>
            <p className="text-gray-400">© 2025 FitConnect. All rights reserved.</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul>
              <li><a href="/about" className="text-gray-400 hover:text-gray-300">About Us</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-gray-300">Services</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-gray-300">Contact</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-gray-300">Terms & Conditions</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-gray-300">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-6">
              <a href="https://facebook.com" className="text-gray-400 hover:text-blue-500" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-pink-500" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
